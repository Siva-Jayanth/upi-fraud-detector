
import React from 'react';
import { 
  Menubar, 
  MenubarContent, 
  MenubarItem, 
  MenubarMenu, 
  MenubarSeparator, 
  MenubarShortcut, 
  MenubarTrigger 
} from '@/components/ui/menubar';
import { Button } from '@/components/ui/button';
import { Shield, User, LogIn, LogOut, Settings, Bell, HelpCircle } from 'lucide-react';

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
            <span className="text-xl font-semibold text-gray-800">UPI Fraud Shield</span>
          </div>
          
          <div className="flex items-center gap-4">
            <Menubar className="border-none bg-transparent">
              <MenubarMenu>
                <MenubarTrigger className="text-gray-600 hover:text-gray-900 hover:bg-gray-200">Dashboard</MenubarTrigger>
                <MenubarContent>
                  <MenubarItem>Overview</MenubarItem>
                  <MenubarItem>Analytics</MenubarItem>
                  <MenubarItem>Reports</MenubarItem>
                </MenubarContent>
              </MenubarMenu>
              
              <MenubarMenu>
                <MenubarTrigger className="text-gray-600 hover:text-gray-900 hover:bg-gray-200">Protection</MenubarTrigger>
                <MenubarContent>
                  <MenubarItem>Fraud Detection</MenubarItem>
                  <MenubarItem>Spam Blocking</MenubarItem>
                  <MenubarItem>Security Settings</MenubarItem>
                </MenubarContent>
              </MenubarMenu>
              
              <MenubarMenu>
                <MenubarTrigger className="text-gray-600 hover:text-gray-900 hover:bg-gray-200">Help</MenubarTrigger>
                <MenubarContent>
                  <MenubarItem>
                    <HelpCircle className="mr-2 h-4 w-4" />
                    <span>Documentation</span>
                  </MenubarItem>
                  <MenubarSeparator />
                  <MenubarItem>FAQ</MenubarItem>
                  <MenubarItem>Contact Support</MenubarItem>
                </MenubarContent>
              </MenubarMenu>
            </Menubar>

            {isLoggedIn ? (
              <div className="flex items-center gap-4">
                <Button 
                  variant="ghost" 
                  size="icon" 
                  onClick={onViewNotifications}
                  className="relative text-gray-600 hover:text-gray-900 hover:bg-gray-200"
                >
                  <Bell className="h-5 w-5" />
                  <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-fraud-high"></span>
                </Button>
                
                <Menubar className="border-none bg-transparent">
                  <MenubarMenu>
                    <MenubarTrigger className="flex items-center gap-2 text-gray-600 hover:text-gray-900 hover:bg-gray-200">
                      <User className="h-5 w-5" />
                      <span>{username || 'User'}</span>
                    </MenubarTrigger>
                    <MenubarContent>
                      <MenubarItem>
                        <User className="mr-2 h-4 w-4" />
                        <span>Profile</span>
                      </MenubarItem>
                      <MenubarItem>
                        <Settings className="mr-2 h-4 w-4" />
                        <span>Settings</span>
                      </MenubarItem>
                      <MenubarSeparator />
                      <MenubarItem onClick={onLogout}>
                        <LogOut className="mr-2 h-4 w-4" />
                        <span>Log out</span>
                      </MenubarItem>
                    </MenubarContent>
                  </MenubarMenu>
                </Menubar>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Button 
                  variant="ghost" 
                  className="text-gray-600 hover:text-gray-900 hover:bg-gray-200 flex items-center gap-1"
                  onClick={onSignIn}
                >
                  <LogIn className="h-4 w-4" />
                  Sign In
                </Button>
                <Button 
                  className="bg-gray-800 hover:bg-gray-700 text-white flex items-center gap-1"
                  onClick={onSignUp}
                >
                  <User className="h-4 w-4" />
                  Sign Up
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MenuBar;
