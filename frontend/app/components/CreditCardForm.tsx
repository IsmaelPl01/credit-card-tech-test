"use client"

import type React from "react"
import { useState } from "react"
import { useCards } from "../context/CardContext"
import { useCardValidation } from "../hook/useCardValidation"
import CardPreview from "./CardPreview"

export default function CreditCardForm() {
  const { addCard, loading } = useCards()
  const { errors, setErrors, validateAll } = useCardValidation()

  const [formData, setFormData] = useState({
    cardNumber: "",
    cardholderName: "",
    expiryDate: "",
    cvv: "",
  })

  const [focus, setFocus] = useState<"number" | "name" | "expiry" | "cvc" | "">("")

  const hasFormData = Object.values(formData).some(value => value.trim() !== "")

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target

    setErrors((prev) => ({ ...prev, [name]: undefined }))

    switch (name) {
      case "cardNumber":
        if (/^\d*$/.test(value) && value.length <= 16) {
          setFormData((prev) => ({ ...prev, cardNumber: value }))
        }
        break

      case "cardholderName":
        if (/^[a-záéíóúñü\s]*$/i.test(value) && value.length <= 20) {
          setFormData((prev) => ({ ...prev, cardholderName: value.toUpperCase() }))
        }
        break

      case "expiryDate":
        let formatted = value.replace(/\D/g, "")
        if (formatted.length >= 3) {
          formatted = `${formatted.slice(0, 2)}/${formatted.slice(2, 4)}`
        }
        if (formatted.length <= 5) {
          setFormData((prev) => ({ ...prev, expiryDate: formatted }))
        }
        break

      case "cvv":
        if (/^\d*$/.test(value) && value.length <= 4) {
          setFormData((prev) => ({ ...prev, cvv: value }))
        }
        break
    }
  }

  const handleInputFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    const focusMap: Record<string, "number" | "name" | "expiry" | "cvc"> = {
      cardNumber: "number",
      cardholderName: "name",
      expiryDate: "expiry",
      cvv: "cvc",
    }
    setFocus(focusMap[e.target.name] || "")
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const validation = validateAll(formData)

    if (validation.isValid) {
      addCard(formData)
      handleCancel()
    }
  }

  const handleCancel = () => {
    setFormData({
      cardNumber: "",
      cardholderName: "",
      expiryDate: "",
      cvv: "",
    })
    setErrors({})
    setFocus("")
  }

  return (
    <div className="card-form-container">
      <CardPreview
        cardNumber={formData.cardNumber}
        cardholderName={formData.cardholderName}
        expiryDate={formData.expiryDate}
        cvv={formData.cvv}
      />

      <form onSubmit={handleSubmit} className="card-form">
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="cardNumber">Número de Tarjeta</label>
            <input
              type="text"
              id="cardNumber"
              name="cardNumber"
              value={formData.cardNumber}
              onChange={handleInputChange}
              onFocus={handleInputFocus}
              placeholder="5375 4411 4540 0954"
              className={errors.cardNumber ? "error" : ""}
            />
            {errors.cardNumber && <span className="error-message">{errors.cardNumber}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="expiryDate">Fecha Vencimiento</label>
            <input
              type="text"
              id="expiryDate"
              name="expiryDate"
              value={formData.expiryDate}
              onChange={handleInputChange}
              onFocus={handleInputFocus}
              placeholder="06/24"
              className={errors.expiryDate ? "error" : ""}
            />
            {errors.expiryDate && <span className="error-message">{errors.expiryDate}</span>}
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="cardholderName">Nombre Titular</label>
            <input
              type="text"
              id="cardholderName"
              name="cardholderName"
              value={formData.cardholderName}
              onChange={handleInputChange}
              onFocus={handleInputFocus}
              placeholder="DONALD FLINCH CORTEZ"
              className={errors.cardholderName ? "error" : ""}
            />
            {errors.cardholderName && <span className="error-message">{errors.cardholderName}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="cvv">CVV</label>
            <input
              type="text"
              id="cvv"
              name="cvv"
              value={formData.cvv}
              onChange={handleInputChange}
              onFocus={handleInputFocus}
              placeholder="123"
              className={errors.cvv ? "error" : ""}
            />
            {errors.cvv && <span className="error-message">{errors.cvv}</span>}
          </div>
        </div>

        <div className="form-actions">
          <button type="submit" className="btn-submit" disabled={loading}>
            {loading ? "Agregando..." : "Agregar Tarjeta"}
          </button>
          <button 
            type="button" 
            className={`btn-cancel ${hasFormData ? 'btn-cancel-active' : ''}`}
            onClick={handleCancel}
          >
            Cancelar
          </button>
        </div>
      </form>
    </div>
  )
}
