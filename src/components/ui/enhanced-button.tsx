import { Button } from "./button";
import { cn } from "@/lib/utils";
import { ButtonProps } from "./button";

interface EnhancedButtonProps extends Omit<ButtonProps, 'variant'> {
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link" | "medical" | "success";
}

export const EnhancedButton: React.FC<EnhancedButtonProps> = ({ 
  className, 
  variant = "default", 
  ...props 
}) => {
  const medicalVariants = {
    medical: "bg-primary hover:bg-primary-dark text-primary-foreground shadow-medical transition-all duration-300 hover:shadow-lg",
    success: "bg-success hover:bg-success/90 text-success-foreground shadow-soft transition-all duration-300"
  };

  if (variant === "medical" || variant === "success") {
    return (
      <Button
        className={cn(medicalVariants[variant], className)}
        {...props}
      />
    );
  }

  return <Button variant={variant as any} className={className} {...props} />;
};