"use client";

import Header from "../components/Header";
import Footer from "../components/Footer";
import { Heading, Text, Card, Badge, Button } from "../components/ui";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

const sponsors = {
    current: [
        {
            name: "Anthropic",
            logo: "/sponsors/anthropic.png",
            description: "Primary Sponsor"
        }
    ],
    past: [
        { name: "Polymarket", logo: "/sponsors/polymarket.svg" },
        { name: "ether.fi", logo: "/sponsors/etherfi.png" },
        { name: "Base", logo: "/sponsors/base.png" },
        { name: "RedBull", logo: "/sponsors/redbull.svg" },
        { name: "Acorns", logo: "/sponsors/acorns.png" },
        { name: "Streetsmart", logo: "/sponsors/streetsmart.jpeg" }
    ],
};
