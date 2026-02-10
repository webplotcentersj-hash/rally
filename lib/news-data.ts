export type NewsItem = {
  id: string;
  title: string;
  date: string;
  excerpt: string;
  body?: string;
  href?: string;
  image?: string;
  images?: string[];
};

const LIMPIEZA_BODY = `Durante el fin de semana en que se llevó a cabo el Safari de Motos, la Asociación de Pilotos Vallistos implementó acciones orientadas al cuidado del ambiente, disponiendo un equipo de personas que repartió bolsas de residuos entre quienes disfrutaron de la carrera a la vera del río Valle Fértil. Asimismo, al día siguiente de la competencia se realizó un recorrido por el circuito para retirar los elementos utilizados en la señalización del itinerario, garantizando la limpieza y preservación del entorno natural.

Recordamos que las tareas en el circuito continuarán hasta finalizar todo el recorrido. Asimismo, en caso de que alguien detecte alguna zona o lugar donde haya quedado basura generada por el evento Safari de Motos, puede comunicarse a través de WhatsApp o llamada a los números 264-544-7555, 264-454-9650 y 264-560-2370.`;

export const newsItems: NewsItem[] = [
  {
    id: 'limpieza-safari-motos',
    title: 'Limpieza y cuidado del ambiente durante el Safari de Motos',
    date: '2026-01-28',
    excerpt: 'APIVA realizó reparto de bolsas de residuos y recorrido post-competencia para retirar señalización y preservar el entorno.',
    body: LIMPIEZA_BODY,
    images: [
      '/noticias/limpieza/630111148_122167881632744050_3061215669795850975_n.jpg',
      '/noticias/limpieza/630317034_122167881638744050_1415057141556000543_n.jpg',
      '/noticias/limpieza/631501700_122167881434744050_5130305334873522690_n.jpg',
      '/noticias/limpieza/631781234_122167881578744050_2060158109283867640_n.jpg',
      '/noticias/limpieza/631860633_122167881470744050_6517866686477194431_n.jpg',
      '/noticias/limpieza/633441453_122167881386744050_8452572084001473713_n.jpg',
    ],
  },
];
