
import React from 'react';
import { 
  Shield, User, LogIn, LogOut, Settings, Bell, MoreVertical
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import MainNavigation from './MainNavigation';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface MenuBarProps {
  isLoggedIn: boolean;
  onSignIn: () => void;
  onSignUp: () => void;
  onLogout: () => void;
  onViewNotifications: () => void;
  username?: string;
}

const MenuBar: React.FC<MenuBarProps> = ({ 
  isLoggedIn, 
  onSignIn, 
  onSignUp, 
  onLogout,
  onViewNotifications,
  username 
}) => {
  return (
    <div className="w-full bg-gray-100 border-b border-gray-200 sticky top-0 z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center gap-2">
            <Shield className="h-6 w-6 text-gray-800" />
            <span className="text-xl font-semibold text-gray-800">UPI Fraud Detector</span>
          </div>
          
          <div className="hidden md:flex items-center">
            <MainNavigation isLoggedIn={isLoggedIn} />
          </div>
          
          <div className="flex items-center gap-4">
            {isLoggedIn && (
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={onViewNotifications}
                className="relative text-gray-600 hover:text-gray-900 hover:bg-gray-200"
              >
                <Bell className="h-5 w-5" />
                <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-fraud-high"></span>
              </Button>
            )}
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="rounded-full h-10 w-10 flex items-center justify-center border-2 border-gray-300 hover:border-gray-400 hover:bg-gray-200"
                >
                  <MoreVertical className="h-5 w-5 text-gray-600" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                {isLoggedIn ? (
                  <>
                    <div className="px-2 py-1.5 text-sm font-medium text-gray-500">
                      Signed in as <span className="font-semibold text-gray-900">{username}</span>
                    </div>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem 
                      className="cursor-pointer flex items-center"
                      onClick={onViewNotifications}
                    >
                      <Bell className="mr-2 h-4 w-4" />
                      <span>Notifications</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem className="cursor-pointer flex items-center">
                      <User className="mr-2 h-4 w-4" />
                      <span>Profile</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem className="cursor-pointer flex items-center">
                      <Settings className="mr-2 h-4 w-4" />
                      <span>Settings</span>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem 
                      className="cursor-pointer flex items-center text-red-600"
                      onClick={onLogout}
                    >
                      <LogOut className="mr-2 h-4 w-4" />
                      <span>Sign out</span>
                    </DropdownMenuItem>
                  </>
                ) : (
                  <>
                    <DropdownMenuItem 
                      className="cursor-pointer flex items-center"
                      onClick={onSignIn}
                    >
                      <LogIn className="mr-2 h-4 w-4" />
                      <span>Sign in</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem 
                      className="cursor-pointer flex items-center"
                      onClick={onSignUp}
                    >
                      <User className="mr-2 h-4 w-4" />
                      <span>Sign up</span>
                    </DropdownMenuItem>
                  </>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MenuBar;
