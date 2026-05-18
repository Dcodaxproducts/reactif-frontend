export interface SpecialistCardProps {
  name: string;
  role: string;
  rating: number;
  reviews: number;
  location: string;
  tags: string[];
  experience: string;
  price: string;
  avatarColor?: string;
  avatarImage?: string | null;
  portfolioLink?: string;
  selectLink?: string;
  available?: boolean;
}
