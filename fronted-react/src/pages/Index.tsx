
import NavigationBar from "@/components/NavigationBar";
import HeroSection from "@/components/HeroSection";
import SectionCard from "@/components/SectionCard";
import { Book, Shuffle, Edit3 } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen bg-surface">
      <NavigationBar />
      <HeroSection />
      
      <div id="sections" className="container mx-auto px-4 py-16">
        <SectionCard 
          title="Recipe Vault"
          description="Explore our extensive collection of curated recipes from around the world. From traditional dishes to modern cuisine, find detailed instructions, ingredients lists, and cooking tips for every recipe. Perfect for both beginners and experienced chefs."
          image="https://images.unsplash.com/photo-1547592180-85f173990554?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
          imagePosition="left"
          route="vault"
          icon={<Book className="h-8 w-8" />}
        />
        
        <SectionCard 
          title="Recipe Remix"
          description="Transform your available ingredients into delicious meals with our AI-powered recipe generator. Simply input what you have in your kitchen, and let our system suggest creative and practical recipes tailored to your ingredients."
          image="https://images.unsplash.com/photo-1466637574441-749b8f19452f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80"
          imagePosition="right"
          route="remix"
          icon={<Shuffle className="h-8 w-8" />}
        />
        
        <SectionCard 
          title="Recipe Revamp"
          description="Elevate your existing recipes with our AI-enhanced suggestions. Get creative variations, ingredient substitutions, and professional tips to transform your familiar dishes into extraordinary culinary experiences."
          image="https://images.unsplash.com/photo-1556911220-e15b29be8c8f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
          imagePosition="left"
          route="revamp"
          icon={<Edit3 className="h-8 w-8" />}
        />
      </div>
    </div>
  );
};

export default Index;
