"use client";
import Chat from '@/components/chat'
import StartChat from '@/components/startchat'
import { useSearchParams } from 'next/navigation'

const Page = () => {
  const searchParams = useSearchParams()
  const newChat = searchParams.get('new')

  return (
    <>
      {newChat === 'true' ? (
        <StartChat />
      ) : (
        <Chat />
      )}
    </>
  )
}

export default Page