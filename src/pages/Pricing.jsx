import React, { useState, useEffect } from 'react';
import { Card } from '../components/Card';
import Input from '../components/Input';
import Button from '../components/Button';
import Modal from '../components/Modal';
import {
  getPresetPrices,
  applyPresetPrice,
  calculatePricePreview,
  overrideOrderPrice,
  getOrderPriceBreakdown
} from '../services/api';
import '../styles/Pricing.css';

/**
 * PRICING PAGE
 * Comprehensive price management interface
 *
 * Features:
 * - Preset Management: View and apply pricing presets
 * - Price Calculator: Calculate price previews
 * - Order Price Tools: Override prices and view breakdowns
 */

const Pricing = () => {
  // State for presets
  const [presets, setPresets] = useState({});
  const [presetsLoading, setPresetsLoading] = useState(true);
  const [presetsError, setPresetsError] = useState(null);

  // Modal states
  const [modal, setModal] = useState({
    isOpen: false,
    type: '', // 'success', 'error', 'confirm'
    title: '',
    message: '',
    data: null
  });

  // State for price calculator
  const [calcForm, setCalcForm] = useState({
    distance_km: '',
    rate_per_km: '',
    minimum_fare: ''
  });
  const [calcResult, setCalcResult] = useState(null);
  const [calcLoading, setCalcLoading] = useState(false);
  const [calcError, setCalcError] = useState(null);

  // State for order price override
  const [overrideForm, setOverrideForm] = useState({
    orderId: '',
    newPrice: '',
    reason: ''
  });
  const [overrideLoading, setOverrideLoading] = useState(false);
  const [overrideResult, setOverrideResult] = useState(null);
  const [overrideError, setOverrideError] = useState(null);

  // State for price breakdown
  const [breakdownOrderId, setBreakdownOrderId] = useState('');
  const [breakdownResult, setBreakdownResult] = useState(null);
  const [breakdownLoading, setBreakdownLoading] = useState(false);
  const [breakdownError, setBreakdownError] = useState(null);

  // Load presets on component mount
  useEffect(() => {
    loadPresets();
  }, []);

  const loadPresets = async () => {
    try {
      setPresetsLoading(true);
      setPresetsError(null);
      const response = await getPresetPrices();
      setPresets(response.presets || {});
    } catch (error) {
      setPresetsError('Failed to load pricing presets');
      console.error('Error loading presets:', error);
    } finally {
      setPresetsLoading(false);
    }
  };

  const handleApplyPreset = async (presetName) => {
    try {
      const result = await applyPresetPrice(presetName);
      // Refresh presets to show updated active preset
      await loadPresets();
      setModal({
        isOpen: true,
        type: 'success',
        title: 'Preset Applied Successfully',
        message: result.message || `Successfully applied ${presetName} pricing preset`,
        data: result
      });
    } catch (error) {
      setModal({
        isOpen: true,
        type: 'error',
        title: 'Failed to Apply Preset',
        message: error.message || `Failed to apply ${presetName} preset`,
        data: null
      });
      console.error('Error applying preset:', error);
    }
  };

  const handleCalculatePrice = async () => {
    if (!calcForm.distance_km) {
      setCalcError('Distance is required');
      return;
    }

    try {
      setCalcLoading(true);
      setCalcError(null);
      const result = await calculatePricePreview(
        parseFloat(calcForm.distance_km),
        calcForm.rate_per_km ? parseFloat(calcForm.rate_per_km) : null,
        calcForm.minimum_fare ? parseFloat(calcForm.minimum_fare) : null
      );
      setCalcResult(result);
    } catch (error) {
      setCalcError('Failed to calculate price preview');
      console.error('Error calculating price:', error);
    } finally {
      setCalcLoading(false);
    }
  };

  const handleOverridePrice = async () => {
    if (!overrideForm.orderId || !overrideForm.newPrice) {
      setOverrideError('Order ID and new price are required');
      return;
    }

    try {
      setOverrideLoading(true);
      setOverrideError(null);
      const result = await overrideOrderPrice(
        overrideForm.orderId,
        parseFloat(overrideForm.newPrice),
        overrideForm.reason || null
      );
      setOverrideResult(result);
      setOverrideForm({ orderId: '', newPrice: '', reason: '' });
    } catch (error) {
      setOverrideError('Failed to override order price');
      console.error('Error overriding price:', error);
    } finally {
      setOverrideLoading(false);
    }
  };

  const handleGetBreakdown = async () => {
    if (!breakdownOrderId) {
      setBreakdownError('Order ID is required');
      return;
    }

    try {
      setBreakdownLoading(true);
      setBreakdownError(null);
      const result = await getOrderPriceBreakdown(breakdownOrderId);
      setBreakdownResult(result);
    } catch (error) {
      setBreakdownError('Failed to get price breakdown');
      console.error('Error getting breakdown:', error);
    } finally {
      setBreakdownLoading(false);
    }
  };

  const handleCalcFormChange = (field, value) => {
    setCalcForm(prev => ({ ...prev, [field]: value }));
    if (calcError) setCalcError(null);
  };

  const handleOverrideFormChange = (field, value) => {
    setOverrideForm(prev => ({ ...prev, [field]: value }));
    if (overrideError) setOverrideError(null);
  };

  return (
    <div className="pricing-container">
      <h1>Price Management</h1>

      {/* Preset Management Section */}
      <div className="pricing-section">
        <h2>Pricing Presets</h2>
        <Card title="Available Presets">
          {presetsLoading ? (
            <div className="loading-state">Loading presets...</div>
          ) : presetsError ? (
            <div className="error-message">{presetsError}</div>
          ) : (
            <div className="preset-grid">
              {Object.entries(presets).map(([name, preset]) => (
                <div key={name} className="preset-card">
                  <div className="preset-name">{name.replace('_', ' ').toUpperCase()}</div>
                  <div className="preset-description">{preset.description}</div>
                  <div className="preset-rates">
                    <div>
                      <div className="rate-label">Rate per KM</div>
                      <div className="rate-value">R{preset.rate_per_km}</div>
                    </div>
                    <div>
                      <div className="rate-label">Min Fare</div>
                      <div className="rate-value">R{preset.minimum_fare}</div>
                    </div>
                  </div>
                  <Button
                    variant="primary"
                    size="sm"
                    onClick={() => handleApplyPreset(name)}
                  >
                    Apply Preset
                  </Button>
                </div>
              ))}
            </div>
          )}
        </Card>
      </div>

      {/* Price Calculator Section */}
      <div className="pricing-section">
        <h2>Price Calculator</h2>
        <Card title="Calculate Price Preview">
          <div className="form-grid">
            <Input
              label="Distance (KM)"
              type="number"
              step="0.1"
              value={calcForm.distance_km}
              onChange={(e) => handleCalcFormChange('distance_km', e.target.value)}
              placeholder="Enter distance"
              required
            />
            <Input
              label="Rate per KM (Optional)"
              type="number"
              step="0.01"
              value={calcForm.rate_per_km}
              onChange={(e) => handleCalcFormChange('rate_per_km', e.target.value)}
              placeholder="Use default rate"
            />
            <Input
              label="Minimum Fare (Optional)"
              type="number"
              step="0.01"
              value={calcForm.minimum_fare}
              onChange={(e) => handleCalcFormChange('minimum_fare', e.target.value)}
              placeholder="Use default minimum"
            />
          </div>
          <div className="form-actions">
            <Button
              variant="primary"
              onClick={handleCalculatePrice}
              loading={calcLoading}
            >
              Calculate Price
            </Button>
          </div>

          {calcError && <div className="error-message">{calcError}</div>}

          {calcResult && (
            <div className="price-result success">
              <h4>Price Calculation Result</h4>
              <div className="price-details">
                <div className="price-detail">
                  <span className="price-detail-label">Distance:</span>
                  <span className="price-detail-value">{calcResult.distance_km} KM</span>
                </div>
                <div className="price-detail">
                  <span className="price-detail-label">Rate per KM:</span>
                  <span className="price-detail-value">R{calcResult.rate_per_km}</span>
                </div>
                <div className="price-detail">
                  <span className="price-detail-label">Minimum Fare:</span>
                  <span className="price-detail-value">R{calcResult.minimum_fare}</span>
                </div>
                <div className="price-detail">
                  <span className="price-detail-label">Calculated Price:</span>
                  <span className="price-detail-value">R{calcResult.calculated_price}</span>
                </div>
                <div className="price-detail">
                  <span className="price-detail-label">Final Price:</span>
                  <span className="price-detail-value">R{calcResult.final_price}</span>
                </div>
                {calcResult.minimum_fare_applied && (
                  <div className="price-detail">
                    <span className="price-detail-label">Minimum Fare Applied:</span>
                    <span className="price-detail-value">Yes</span>
                  </div>
                )}
              </div>
            </div>
          )}
        </Card>
      </div>

      {/* Order Price Tools Section */}
      <div className="pricing-section">
        <h2>Order Price Tools</h2>
        <div className="pricing-grid">
          {/* Price Override */}
          <Card title="Override Order Price">
            <div className="form-grid">
              <Input
                label="Order ID"
                value={overrideForm.orderId}
                onChange={(e) => handleOverrideFormChange('orderId', e.target.value)}
                placeholder="Enter order ID"
                required
              />
              <Input
                label="New Price"
                type="number"
                step="0.01"
                value={overrideForm.newPrice}
                onChange={(e) => handleOverrideFormChange('newPrice', e.target.value)}
                placeholder="Enter new price"
                required
              />
            </div>
            <Input
              label="Reason (Optional)"
              value={overrideForm.reason}
              onChange={(e) => handleOverrideFormChange('reason', e.target.value)}
              placeholder="Reason for price override"
            />
            <div className="form-actions">
              <Button
                variant="danger"
                onClick={handleOverridePrice}
                loading={overrideLoading}
              >
                Override Price
              </Button>
            </div>

            {overrideError && <div className="error-message">{overrideError}</div>}

            {overrideResult && (
              <div className="price-result success">
                <h4>Price Override Successful</h4>
                <p>Order {overrideResult.id} price has been updated to R{overrideResult.price}</p>
              </div>
            )}

            <Modal
              isOpen={modal.isOpen}
              onClose={() => setModal({ ...modal, isOpen: false })}
              title={modal.title}
              size="md"
            >
              <div style={{ textAlign: 'center' }}>
                {modal.type === 'success' && (
                  <div style={{ color: 'var(--success)', fontSize: '3rem', marginBottom: '1rem' }}>
                    ✓
                  </div>
                )}
                {modal.type === 'error' && (
                  <div style={{ color: 'var(--danger)', fontSize: '3rem', marginBottom: '1rem' }}>
                    ✕
                  </div>
                )}
                <p style={{ marginBottom: '1rem' }}>{modal.message}</p>
                {modal.data && modal.type === 'success' && (
                  <div style={{ background: 'var(--bg-tertiary)', padding: '1rem', borderRadius: 'var(--radius-md)', textAlign: 'left' }}>
                    <h4 style={{ marginBottom: '0.5rem', color: 'var(--text-primary)' }}>Details:</h4>
                    <div style={{ display: 'grid', gap: '0.5rem' }}>
                      {Object.entries(modal.data).map(([key, value]) => (
                        <div key={key} style={{ display: 'flex', justifyContent: 'space-between' }}>
                          <span style={{ color: 'var(--text-secondary)', textTransform: 'capitalize' }}>
                            {key.replace('_', ' ')}:
                          </span>
                          <span style={{ color: 'var(--text-primary)', fontWeight: '600' }}>
                            {typeof value === 'number' ? `R${value}` : value}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </Modal>
          </Card>

          {/* Price Breakdown */}
          <Card title="Price Breakdown">
            <Input
              label="Order ID"
              value={breakdownOrderId}
              onChange={(e) => {
                setBreakdownOrderId(e.target.value);
                if (breakdownError) setBreakdownError(null);
              }}
              placeholder="Enter order ID"
              required
            />
            <div className="form-actions">
              <Button
                variant="secondary"
                onClick={handleGetBreakdown}
                loading={breakdownLoading}
              >
                Get Breakdown
              </Button>
            </div>

            {breakdownError && <div className="error-message">{breakdownError}</div>}

            {breakdownResult && (
              <div className="breakdown-section">
                <h4>Price Breakdown for Order {breakdownResult.order_id}</h4>
                <div className="breakdown-grid">
                  <div className="breakdown-item">
                    <div className="breakdown-label">Actual Price</div>
                    <div className="breakdown-value">R{breakdownResult.actual_price}</div>
                  </div>
                  <div className="breakdown-item">
                    <div className="breakdown-label">Distance</div>
                    <div className="breakdown-value">{breakdownResult.distance_km} KM</div>
                  </div>
                  <div className="breakdown-item">
                    <div className="breakdown-label">Rate per KM</div>
                    <div className="breakdown-value">R{breakdownResult.rate_per_km}</div>
                  </div>
                  <div className="breakdown-item">
                    <div className="breakdown-label">Minimum Fare</div>
                    <div className="breakdown-value">R{breakdownResult.minimum_fare}</div>
                  </div>
                  <div className="breakdown-item">
                    <div className="breakdown-label">Calculated Price</div>
                    <div className="breakdown-value">R{breakdownResult.calculated_price}</div>
                  </div>
                  <div className="breakdown-item">
                    <div className="breakdown-label">Should Be Price</div>
                    <div className="breakdown-value">R{breakdownResult.should_be_price}</div>
                  </div>
                  <div className="breakdown-item">
                    <div className="breakdown-label">Difference</div>
                    <div className="breakdown-value">R{breakdownResult.difference}</div>
                  </div>
                  <div className="breakdown-item">
                    <div className="breakdown-label">Custom Price</div>
                    <div className="breakdown-value">{breakdownResult.is_custom_price ? 'Yes' : 'No'}</div>
                  </div>
                </div>
              </div>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Pricing;