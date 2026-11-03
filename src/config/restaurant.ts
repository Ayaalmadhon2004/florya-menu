/**
 * إعدادات المطعم — هذا هو الملف الوحيد الذي تعدّله لكل عميل جديد.
 * Restaurant settings — the ONLY file you edit per client (plus src/data/menu.ts).
 */
import type { Lang } from "../lib/i18n";

export const restaurant = {
  name: { ar: "فلوريا", en: "Florya" },
  type: { ar: "مطعم", en: "Restaurant" },
  tagline: {
    ar: "أكل على نار هادئة، وسفرة تجمع أهلك وأحبابك",
    en: "Food cooked slowly, and a table made for sharing",
  },
  /** رقم الواتساب بصيغة دولية بدون + أو أصفار (مثال: 966501234567) */
  whatsapp: "966501234567",
  phone: "+966 50 123 4567",
  instagram: "florya_rest",
  address: {
    ar: "طريق الملك فهد، الرياض، المملكة العربية السعودية",
    en: "King Fahd Road, Riyadh, Saudi Arabia",
  },
  hours: { ar: "كل يوم من 12 الظهر لين 12 الليل", en: "Every day, noon to midnight" },
  mapsUrl: "https://maps.google.com/?q=Riyadh",
  currency: { ar: "ر.س", en: "SAR" },
  /** اللغة الافتراضية عند أول زيارة */
  defaultLang: "ar" as Lang,
  /** العنوان الأساسي للموقع بعد النشر — يُستخدم في صفحة طباعة QR للطاولات */
  siteUrl: "",
  /** لون العلامة التجارية — غيّره أيضًا في globals.css (--color-burgundy) */
  /** صورة غلاف اختيارية (رابط أو ملف داخل public/). اتركها فارغة لاستخدام رسمة الواجهة الجاهزة. */
  coverImage: "",
  themeColor: "#722F37",
};
