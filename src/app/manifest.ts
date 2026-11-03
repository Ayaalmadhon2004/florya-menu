import type { MetadataRoute } from "next";
import { restaurant } from "../config/restaurant";

export const dynamic = "force-static";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${restaurant.name.ar} | ${restaurant.name.en}`,
    short_name: restaurant.name.ar,
    start_url: "/",
    display: "standalone",
    background_color: "#F5F0EB",
    theme_color: restaurant.themeColor,
    lang: "ar",
    dir: "rtl",
  };
}
