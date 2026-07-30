import ChatContainer from "@/components/chat/chat-container";

interface ChatThreadPageProps {
  params: Promise<{
    threadId: string;
  }>;
}

const ChatThreadPage = async ({ params }: ChatThreadPageProps) => {
  const { threadId } = await params;

  return <ChatContainer threadId={threadId} />;
};

export default ChatThreadPage;
