import { ProductCategory, ProductCondition } from '../backend';

export async function detectCategory(images: File[]): Promise<ProductCategory> {
  // Simulate AI processing
  await new Promise((resolve) => setTimeout(resolve, 1500));

  const categories: ProductCategory[] = [
    ProductCategory.electronics,
    ProductCategory.furniture,
    ProductCategory.clothing,
    ProductCategory.books,
    ProductCategory.sports,
    ProductCategory.homeAppliances,
  ];

  return categories[Math.floor(Math.random() * categories.length)];
}

export async function estimatePrice(
  category: ProductCategory,
  condition: ProductCondition,
  age: number
): Promise<{ min: number; max: number; suggested: number }> {
  // Simulate AI processing
  await new Promise((resolve) => setTimeout(resolve, 2000));

  const basePrice = {
    [ProductCategory.electronics]: 15000,
    [ProductCategory.furniture]: 5000,
    [ProductCategory.clothing]: 1000,
    [ProductCategory.books]: 300,
    [ProductCategory.sports]: 2000,
    [ProductCategory.homeAppliances]: 8000,
    [ProductCategory.toys]: 500,
    [ProductCategory.tools]: 1500,
    [ProductCategory.automotive]: 25000,
    [ProductCategory.beauty]: 800,
    [ProductCategory.other]: 1000,
  }[category];

  const conditionMultiplier = {
    [ProductCondition.new_]: 1.0,
    [ProductCondition.likeNew]: 0.85,
    [ProductCondition.good]: 0.65,
    [ProductCondition.fair]: 0.45,
    [ProductCondition.poor]: 0.25,
  }[condition];

  const ageMultiplier = Math.max(0.3, 1 - age * 0.1);

  const suggested = Math.round(basePrice * conditionMultiplier * ageMultiplier);
  const min = Math.round(suggested * 0.8);
  const max = Math.round(suggested * 1.2);

  return { min, max, suggested };
}

export async function generateDescription(
  category: ProductCategory,
  condition: ProductCondition,
  title: string
): Promise<string> {
  // Simulate AI processing
  await new Promise((resolve) => setTimeout(resolve, 1000));

  const descriptions: Record<ProductCategory, string> = {
    [ProductCategory.electronics]: `This ${title} is in ${condition} condition. Perfect for everyday use with all features working properly. Comes from a smoke-free home.`,
    [ProductCategory.furniture]: `Beautiful ${title} in ${condition} condition. Sturdy construction and well-maintained. Would be a great addition to any home.`,
    [ProductCategory.clothing]: `${title} in ${condition} condition. Clean and well-cared for. Check measurements before purchasing.`,
    [ProductCategory.books]: `${title} in ${condition} condition. Pages are intact with minimal wear. Great for reading or collecting.`,
    [ProductCategory.sports]: `${title} in ${condition} condition. Lightly used and ready for action. Perfect for fitness enthusiasts.`,
    [ProductCategory.homeAppliances]: `${title} in ${condition} condition. Fully functional and energy efficient. Includes original accessories.`,
    [ProductCategory.toys]: `${title} in ${condition} condition. Safe and fun for children. Well-maintained.`,
    [ProductCategory.tools]: `${title} in ${condition} condition. Reliable and ready for work.`,
    [ProductCategory.automotive]: `${title} in ${condition} condition. Well-maintained vehicle component.`,
    [ProductCategory.beauty]: `${title} in ${condition} condition. Gently used beauty product.`,
    [ProductCategory.other]: `${title} in ${condition} condition. Well-maintained and ready for a new home.`,
  };

  return descriptions[category];
}
