import { AdvancedSelectOptionOrGroup } from "./advanced-select.models";

export const options: AdvancedSelectOptionOrGroup<unknown>[] = [
  {
    label: "Geldende versie",
    variant: "success",
    redirect: {
      href: "#",
      label: "Bekijk eerder vastgestelde versies",
    },
    options: [
      {
        label: "In werking (laatst gewijzigd: 01-01-2024)",
      },
    ],
  },
  {
    label: "Toekomstige versies",
    summaryCounter: true,
    options: [
      {
        label: "Citeertitel van het besluit (In werking per 01-03-2024)",
      },
      {
        label: "Citeertitel van het besluit (In werking per 01-04-2024)",
      },
    ],
  },
  {
    label: "Ontwerp versies ter inzage",
    variant: "warning",
    redirect: {
      href: "#",
      label: "Bekijk ontwerpen met afgeronde inzage termijn",
    },
    summaryCounter: true,
    options: [
      {
        label: "Verandering in annotaties (Einde inzage: 01-02-2024)",
      },
      {
        label: "Herziening Achterwillense-weg 12-34 (Einde inzage: 08-02-2024)",
      },
      {
        label:
          "Algemene regels voor het beheer en onderhoud van waterstaatswerken en het gebruik van watersystemen (Keur waterschap Vechtstromen 2020) (Einde inzage: 09-02-2024)",
      },
    ],
  },
];
