import React, { useMemo } from 'react'
import { useOrderForm } from 'vtex.order-manager/OrderForm'
import { FormattedCurrency } from 'vtex.format-currency'
import { useCssHandles } from 'vtex.css-handles'

interface CustomProgressBarMinicartProps {
  label?: string
  freeShippingTotal?: string | number
  removeTax?: boolean
  showProgressBar?: boolean
}

const CSS_HANDLES = [
  'cpbmContainer',
  'cpbmMessage',
  'cpbmMessageMet',
  'cpbmMessageUnmet',
  'cpbmProgressBar',
  'cpbmRange',
  'cpbmRemaining',
] as const

const CustomProgressBarMinicart: StorefrontFunctionComponent<CustomProgressBarMinicartProps> = ({
  label = 'Envío gratis',
  freeShippingTotal = '0',
  removeTax = true,
  showProgressBar = true,
}) => {
  const handles = useCssHandles(CSS_HANDLES)
  const { orderForm, loading } = useOrderForm()

  const threshold = useMemo(() => {
    const n = typeof freeShippingTotal === 'string' ? parseFloat(freeShippingTotal) : Number(freeShippingTotal)
    return isNaN(n) ? 0 : n
  }, [freeShippingTotal])

  const { remaining, met, progressPct } = useMemo(() => {
    if (loading || !orderForm) {
      return { remaining: 0, met: false, progressPct: 0 }
    }

    const valueInCents = orderForm?.value ?? 0
    const taxInCents =
      removeTax &&
        Array.isArray(orderForm?.totalizers) &&
        orderForm.totalizers.length > 0
        ? (orderForm.totalizers.find((t: any) => t?.id === 'Tax')?.value ?? 0)
        : 0

    const total = (valueInCents - taxInCents) / 100
    const met = threshold > 0 ? total >= threshold : false
    const remaining = met ? 0 : Math.max(threshold - total, 0)
    const progressPct = threshold > 0 ? Math.max(0, Math.min(100, (total / threshold) * 100)) : 0

    return { remaining, met, progressPct }
  }, [orderForm, loading, removeTax, threshold])

  if (threshold <= 0) return null

  return (
    <div className={handles.cpbmContainer}>
      <p className={`${handles.cpbmMessage} ${met ? handles.cpbmMessageMet : handles.cpbmMessageUnmet}`}>
        {met ? (
          <>¡Ya alcanzaste <strong>{label}</strong>!</>
        ) : (
          <>
            Te faltan{' '}
            <span className={handles.cpbmRemaining}>
              <FormattedCurrency value={remaining} />
            </span>{' '}
            para <strong>{label}</strong>.
          </>
        )}
      </p>

      {showProgressBar && (
        <div className={handles.cpbmProgressBar}>
          <input
            type="range"
            min={0}
            max={100}
            step={1}
            value={Math.round(progressPct)}
            onChange={() => { }}
            aria-label={`Progreso hacia ${label}: ${Math.round(progressPct)}%`}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={Math.round(progressPct)}
            className={handles.cpbmRange}
            style={{
              background: `linear-gradient(to right, #1bb55c ${progressPct}%, #f3f4f6 ${progressPct}%)`
            }}
          />
        </div>
      )}
    </div>
  )
}

CustomProgressBarMinicart.schema = {
  title: 'Custom Progress Bar Minicart (Free Shipping)',
  description: 'Muestra si el carrito alcanza el monto de envío gratis y el progreso hacia ese objetivo.',
  type: 'object',
  properties: {
    showProgressBar: {
      title: 'Mostrar barra de progreso',
      type: 'boolean',
      default: true,
    },
    label: {
      title: 'Etiqueta del beneficio',
      type: 'string',
      default: 'Envío gratis',
    },
    freeShippingTotal: {
      title: 'Monto de envío gratis',
      description: 'Monto objetivo para aplicar el beneficio (ej: 25000).',
      type: 'string',
      default: '0',
    },
    removeTax: {
      title: 'Excluir impuestos del cálculo',
      type: 'boolean',
      default: true,
    },
  },
}

export default CustomProgressBarMinicart
