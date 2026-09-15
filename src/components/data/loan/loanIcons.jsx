// src/data/loanIcons.jsx
import {
  Home,
  Landmark,
  Building,
  Wallet,
  RefreshCw,
  TrendingUp,
  Globe,
  Home as HomeIcon,
  Trees,
  Building2,
  RefreshCcw,
  DollarSign,
  Users,
} from "lucide-react";

// Maps the icon name strings stored in loanCategories.js to actual
// lucide-react components. Keeping this separate from the data file lets
// the data stay plain (serialisable, easy to pass through router state)
// while pages resolve icons for rendering.
export const ICONS = {
  Home,
  HomeIcon,
  Landmark,
  Building,
  Building2,
  Wallet,
  RefreshCw,
  RefreshCcw,
  TrendingUp,
  Globe,
  Trees,
  DollarSign,
  Users,
};

export const getIcon = (name, props) => {
  const Cmp = ICONS[name] || Building2;
  return <Cmp {...props} />;
};