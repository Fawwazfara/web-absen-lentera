import { Users, Compass, ClipboardList, Rocket } from "lucide-react";
import { ForwardRefExoticComponent, RefAttributes } from "react";
import { LucideProps } from "lucide-react";

export interface TimelineEvent {
  date: string;
  title: string;
}

export interface TimelineCycle {
  id: string;
  dateRange: string;
  cycleName: string;
  title: string;
  icon: ForwardRefExoticComponent<Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>>;
  events: TimelineEvent[];
}

export const timelineData: TimelineCycle[] = [
  {
    id: "1",
    dateRange: "20 - 26 JULI",
    cycleName: "SIKLUS 1",
    title: "SOSIALISASI REMPUG WARGA",
    icon: Users,
    events: [
      { date: "20 JULI", title: "Kedatangan & Ramah Tamah" },
      { date: "21 JULI", title: "Pembukaan KKN" },
      { date: "23 JULI", title: "Sowan Warga" },
      { date: "24 JULI", title: "Rempug Warga Desa" },
    ],
  },
  {
    id: "2",
    dateRange: "27 JULI - 2 AGUSTUS",
    cycleName: "SIKLUS 2",
    title: "PEMETAAN SOSIAL",
    icon: Compass,
    events: [
      { date: "27 JULI", title: "Observasi Geografis" },
      { date: "29 JULI", title: "Wawancara Tokoh Masyarakat" },
      { date: "1 AGUSTUS", title: "Identifikasi Masalah & Potensi" },
    ],
  },
  {
    id: "3",
    dateRange: "3 AGUSTUS - 7 AGUSTUS",
    cycleName: "SIKLUS 3",
    title: "PERENCANAAN PROGRAM",
    icon: ClipboardList,
    events: [
      { date: "3 AGUSTUS", title: "Penyusunan Matriks Program" },
      { date: "5 AGUSTUS", title: "Musyawarah Perencanaan" },
      { date: "7 AGUSTUS", title: "Penetapan Program Kerja" },
    ],
  },
  {
    id: "4",
    dateRange: "8 AGUSTUS - 25 AGUSTUS",
    cycleName: "SIKLUS 4",
    title: "PELAKSANAAN PROGRAM",
    icon: Rocket,
    events: [
      { date: "10 AGUSTUS", title: "Lentera Mengajar" },
      { date: "17 AGUSTUS", title: "Semarak Kemerdekaan & Perlombaan" },
      { date: "25 AGUSTUS", title: "Penutupan & Perpisahan" },
    ],
  },
];
