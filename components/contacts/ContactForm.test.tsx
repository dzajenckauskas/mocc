import React from 'react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import ContactForm from './ContactForm'
import axios from 'axios'

vi.mock('axios')

const mockedAxios = axios as unknown as {
  post: ReturnType<typeof vi.fn>
}

describe('ContactForm', () => {
  beforeEach(() => {
    mockedAxios.post = vi.fn().mockResolvedValue({ status: 200, data: {} })
  })

  it('shows validation errors when submitting empty form', async () => {
    render(<ContactForm />)

    fireEvent.submit(screen.getByRole('button', { name: /siųsti žinutę/i }))

    expect(await screen.findByText('Vardas yra privalomas')).toBeInTheDocument()
    expect(await screen.findByText('Žinutė yra privaloma')).toBeInTheDocument()
    expect(await screen.findByText('Įveskite el. pašto adresą')).toBeInTheDocument()
  })

  it('submits valid form and shows success message', async () => {
    render(<ContactForm />)

    fireEvent.change(screen.getByRole('textbox', { name: /Vardas/i }), { target: { value: 'Jonas' } })
    fireEvent.change(screen.getByRole('textbox', { name: /El\. paštas/i }), { target: { value: 'jonas@example.com' } })
    fireEvent.change(screen.getByRole('textbox', { name: /Žinutės tekstas/i }), { target: { value: 'Labas!' } })

    fireEvent.click(screen.getByRole('button', { name: /siųsti žinutę/i }))

    await waitFor(() => {
      expect(mockedAxios.post).toHaveBeenCalled()
    })

    expect(
      screen.getByText('Žinutė išsiųsta! Su Jumis susisieksime artimiausiu metu.')
    ).toBeInTheDocument()
  })
})
