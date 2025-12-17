"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Search, MessageCircle, Settings, Menu } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { ChatListItem } from "@/components/chat/ChatListItem"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

const mockChats = [
  {
    id: "1",
    name: "Sarah Johnson",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
    lastMessage: "Hey! How are you doing?",
    timestamp: "2m ago",
    unreadCount: 3,
    isOnline: true,
  },
  {
    id: "2",
    name: "Mike Chen",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Mike",
    lastMessage: "Thanks for the help yesterday!",
    timestamp: "15m ago",
    unreadCount: 1,
    isOnline: true,
  },
  {
    id: "3",
    name: "Emily Davis",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Emily",
    lastMessage: "See you tomorrow 👋",
    timestamp: "1h ago",
    unreadCount: 0,
    isOnline: false,
  },
  {
    id: "4",
    name: "Alex Turner",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alex",
    lastMessage: "Did you see the latest update?",
    timestamp: "2h ago",
    unreadCount: 0,
    isOnline: true,
  },
  {
    id: "5",
    name: "Jessica Martinez",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Jessica",
    lastMessage: "Perfect! Let's catch up soon",
    timestamp: "3h ago",
    unreadCount: 5,
    isOnline: false,
  },
  {
    id: "6",
    name: "Tom Wilson",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Tom",
    lastMessage: "Happy birthday! 🎉",
    timestamp: "5h ago",
    unreadCount: 0,
    isOnline: false,
  },
  {
    id: "7",
    name: "Rachel Green",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Rachel",
    lastMessage: "Got the documents, thanks!",
    timestamp: "1d ago",
    unreadCount: 0,
    isOnline: true,
  },
  {
    id: "8",
    name: "David Kim",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=David",
    lastMessage: "Meeting at 3 PM?",
    timestamp: "2d ago",
    unreadCount: 0,
    isOnline: false,
  },
]

export default function ChatsPage() {
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedChat, setSelectedChat] = useState<string | null>(null)

  const filteredChats = mockChats.filter((chat) =>
    chat.name.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const handleChatClick = (chatId: string) => {
    setSelectedChat(chatId)
    router.push(`/chats/${chatId}`)
  }

  return (
    <div className="h-screen flex flex-col bg-background">
      <div className="border-b border-border bg-card/50 backdrop-blur-sm">
        <div className="flex items-center justify-between px-4 py-3">
          <div className="flex items-center gap-3">
            <Avatar className="h-10 w-10 cursor-pointer">
              <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=You" />
              <AvatarFallback>You</AvatarFallback>
            </Avatar>
            <div>
              <h2 className="font-semibold text-lg">Messages</h2>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-full">
                  <Menu className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>
                  <Settings className="h-4 w-4 mr-2" />
                  Settings
                </DropdownMenuItem>
                <DropdownMenuItem>Profile</DropdownMenuItem>
                <DropdownMenuItem>New Group</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="text-destructive">
                  Sign Out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        <div className="px-4 pb-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search conversations..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-muted/50 border-border/50"
            />
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto">
        {filteredChats.length > 0 ? (
          filteredChats.map((chat) => (
            <ChatListItem
              key={chat.id}
              id={chat.id}
              avatar={chat.avatar}
              name={chat.name}
              lastMessage={chat.lastMessage}
              timestamp={chat.timestamp}
              unreadCount={chat.unreadCount}
              isOnline={chat.isOnline}
              isActive={selectedChat === chat.id}
              onClick={() => handleChatClick(chat.id)}
            />
          ))
        ) : (
          <div className="flex flex-col items-center justify-center h-full text-center p-8">
            <MessageCircle className="h-16 w-16 text-muted-foreground/50 mb-4" />
            <h3 className="text-lg font-semibold mb-2">No conversations found</h3>
            <p className="text-muted-foreground">
              Try searching with different keywords
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
