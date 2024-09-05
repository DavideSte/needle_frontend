import { Button } from "@/components/ui/button";

export default function TestColors() {
  return (
    <div className="bg-background">
      <Button className="h-10 w-fit bg-background">
        <p className="text-foreground">test foreground</p>
      </Button>
      <Button className="h-10 w-fit bg-card">
        <p className="text-bg-card-foreground">test bg-card</p>
      </Button>
      <Button className="h-10 w-fit bg-popover">
        <p className="text-bg-popover-foreground">test bg-popover</p>
      </Button>
      <Button className="h-10 w-fit bg-primary">
        <p className="text-bg-primary-foreground">test bg-primary</p>
      </Button>
      <Button className="h-10 w-fit bg-secondary">
        <p className="text-bg-secondary-foreground">test bg-secondary</p>
      </Button>
      <Button className="h-10 w-fit bg-muted">
        <p className="text-bg-muted-foreground">test bg-muted</p>
      </Button>
      <Button className="h-10 w-fit bg-accent">
        <p className="text-bg-accent-foreground">test bg-accent</p>
      </Button>
      <Button className="h-10 w-fit bg-destructive">
        <p className="text-bg-destructive-foreground">test bg-destructive</p>
      </Button>
      <Button className="h-10 w-fit bg-border">bg-border</Button>
      <Button className="h-10 w-fit bg-input">bg-input</Button>
      <Button className="h-10 w-fit bg-ring">bg-ring</Button>
    </div>
  );
}
