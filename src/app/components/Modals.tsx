'use client'

import { useState } from 'react'

import { Button } from '@/components/Buttons'
import { Checkbox } from '@/components/Input/Checkbox'
import { Modal } from '@/components/Modal'
import { useConfirmationModal } from '@/hooks/useConfirmationModal'

import { Component } from './Component'

const DEFAULT_VALUES = [
  { id: 1, name: 'Lucifer', watched: true },
  { id: 2, name: 'Stranger Things', watched: true },
  { id: 3, name: 'The Witcher', watched: true },
  { id: 4, name: 'Daredevil', watched: true },
  { id: 5, name: 'Peaky Blinders', watched: true }
]

export function Modals() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [confirmed, setConfirmed] = useState(false)
  const { open: openConfirmationModal } = useConfirmationModal()
  const [storedValues, setStoredValues] = useState(DEFAULT_VALUES)
  const [tvShows, setTvShows] = useState(storedValues)

  function toggleWatchedShow(id: number, watched: boolean) {
    const updatedTvShows = tvShows.map(tvShow => (tvShow.id === id ? { ...tvShow, watched } : tvShow))
    setTvShows(updatedTvShows)
  }

  function closeModal() {
    if (!confirmed) setTvShows(storedValues)
    setConfirmed(false)
    setIsModalOpen(false)
  }

  function confirmAction() {
    setConfirmed(true)
    setStoredValues(tvShows)
  }

  function openConfirmModal() {
    openConfirmationModal({
      title: 'Confirm Modal',
      question: 'Do you want to proceed with this action?',
      onConfirm: confirmAction
    })
  }

  function tvShowItem({ id, name, watched }: (typeof tvShows)[number]) {
    return (
      <li key={id} className="flex gap-4">
        {name}
        <Checkbox color="secondary" checked={watched} onChange={e => toggleWatchedShow(id, e.target.checked)} />
      </li>
    )
  }

  return (
    <Component title="Modal">
      <Button onClick={() => setIsModalOpen(prev => !prev)}>Open Modal</Button>
      <Modal open={isModalOpen} title="TV Shows" onClose={closeModal} size="fixed-sm">
        <Modal.Content>
          <ul>{tvShows.map(tvShow => tvShowItem(tvShow))}</ul>
        </Modal.Content>
        <Modal.Actions>
          <Button onClick={closeModal}>Cancel</Button>
          <Button onClick={openConfirmModal}>Save</Button>
        </Modal.Actions>
      </Modal>
    </Component>
  )
}
