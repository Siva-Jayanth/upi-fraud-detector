
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Shield, HelpCircle, LayoutDashboard, FileText, Camera } from 'lucide-react';
import { 
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@/components/ui/navigation-menu';
import { cn } from '@/lib/utils';

interface MainNavigationProps {
  isLoggedIn: boolean;
}

const MainNavigation: React.FC<MainNavigationProps> = ({ isLoggedIn }) => {
  const navigate = useNavigate();

  const handleNavigation = (path: string) => {
    navigate(path);
  };

  return (
    <NavigationMenu className="max-w-none w-full justify-start">
      <NavigationMenuList className="flex-wrap gap-4">
        <NavigationMenuItem>
          <NavigationMenuLink 
            className={cn(
              "flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-gray-900 transition-colors duration-200",
              "border-2 border-gray-200 rounded-md hover:bg-gray-50",
              "data-[active]:bg-gray-100"
            )}
            onClick={() => handleNavigation('/dashboard')}
          >
            <div className="flex items-center justify-center p-1.5 bg-gray-100 rounded-md">
              <LayoutDashboard className="h-4 w-4" />
            </div>
            <span>Dashboard</span>
          </NavigationMenuLink>
        </NavigationMenuItem>
        
        <NavigationMenuItem>
          <NavigationMenuLink 
            className={cn(
              "flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-gray-900 transition-colors duration-200",
              "border-2 border-gray-200 rounded-md hover:bg-gray-50",
              "data-[active]:bg-gray-100"
            )}
            onClick={() => handleNavigation('/protection')}
          >
            <div className="flex items-center justify-center p-1.5 bg-gray-100 rounded-md">
              <Shield className="h-4 w-4" />
            </div>
            <span>Protection</span>
          </NavigationMenuLink>
        </NavigationMenuItem>
        
        <NavigationMenuItem>
          <NavigationMenuLink 
            className={cn(
              "flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-gray-900 transition-colors duration-200",
              "border-2 border-gray-200 rounded-md hover:bg-gray-50",
              "data-[active]:bg-gray-100"
            )}
            onClick={() => handleNavigation('/transactions')}
          >
            <div className="flex items-center justify-center p-1.5 bg-gray-100 rounded-md">
              <FileText className="h-4 w-4" />
            </div>
            <span>Transactions</span>
          </NavigationMenuLink>
        </NavigationMenuItem>
        
        {isLoggedIn && (
          <NavigationMenuItem>
            <NavigationMenuTrigger 
              className={cn(
                "flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-gray-900 transition-colors duration-200",
                "border-2 border-gray-200 rounded-md hover:bg-gray-50",
                "data-[state=open]:bg-gray-100"
              )}
            >
              <div className="flex items-center justify-center p-1.5 bg-gray-100 rounded-md">
                <Camera className="h-4 w-4" />
              </div>
              <span>AI Scanner</span>
            </NavigationMenuTrigger>
            <NavigationMenuContent>
              <div className="w-[280px] p-4">
                <div className="font-medium mb-2">AI Image Detection</div>
                <p className="text-sm text-muted-foreground mb-4">
                  Upload images like UPI QR codes to verify authenticity and detect potential fraud.
                </p>
                <button className="bg-gray-800 text-white px-4 py-2 rounded-md text-sm w-full">
                  Upload Image
                </button>
              </div>
            </NavigationMenuContent>
          </NavigationMenuItem>
        )}
        
        <NavigationMenuItem>
          <NavigationMenuLink 
            className={cn(
              "flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-gray-900 transition-colors duration-200",
              "border-2 border-gray-200 rounded-md hover:bg-gray-50",
              "data-[active]:bg-gray-100"
            )}
            onClick={() => handleNavigation('/help')}
          >
            <div className="flex items-center justify-center p-1.5 bg-gray-100 rounded-md">
              <HelpCircle className="h-4 w-4" />
            </div>
            <span>Help</span>
          </NavigationMenuLink>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
};

export default MainNavigation;
