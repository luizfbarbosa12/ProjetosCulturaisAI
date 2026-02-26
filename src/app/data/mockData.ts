import { Project } from "../types/project";

export const mockProjects: Project[] = [
  {
    id: "1",
    name: "Festival de Teatro Comunitário 2026",
    edital: "Lei Rouanet - Artes Cênicas",
    category: "Teatro",
    maxBudget: 500000,
    createdAt: "2026-01-15",
    updatedAt: "2026-02-20",
    sections: [
      {
        id: "s1",
        title: "Justificativa",
        text: "O Festival de Teatro Comunitário visa promover a democratização da cultura nas periferias da cidade, oferecendo acesso gratuito a espetáculos de alta qualidade e fomentando a formação de novos artistas locais através de oficinas e workshops.",
        score: 85,
        suggestions: [
          "Adicionar dados estatísticos sobre acesso à cultura na região",
          "Incluir referências bibliográficas sobre impacto social do teatro",
          "Mencionar parcerias com instituições locais"
        ],
        status: "strong",
        weight: 3
      },
      {
        id: "s2",
        title: "Objetivos",
        text: "Realizar 15 apresentações teatrais gratuitas, capacitar 50 jovens em técnicas de teatro, promover a inclusão cultural.",
        score: 65,
        suggestions: [
          "Detalhar melhor os objetivos específicos e mensuráveis",
          "Adicionar indicadores de sucesso para cada objetivo",
          "Incluir objetivos de longo prazo e impacto social"
        ],
        status: "medium",
        weight: 2.5
      },
      {
        id: "s3",
        title: "Metodologia",
        text: "Serão realizadas oficinas semanais com duração de 3 meses.",
        score: 45,
        suggestions: [
          "Expandir a descrição metodológica com mais detalhes",
          "Incluir cronograma de atividades",
          "Descrever a seleção dos participantes",
          "Explicar as técnicas pedagógicas a serem utilizadas"
        ],
        status: "incomplete",
        weight: 2
      },
      {
        id: "s4",
        title: "Contrapartida Social",
        text: "Todas as apresentações serão gratuitas e realizadas em espaços públicos de comunidades periféricas. Distribuição de material educativo sobre história do teatro brasileiro para 1000 estudantes de escolas públicas.",
        score: 90,
        suggestions: [
          "Incluir parcerias com escolas e centros comunitários",
          "Detalhar o material educativo a ser distribuído"
        ],
        status: "strong",
        weight: 2.5
      }
    ],
    budgetItems: [
      {
        id: "b1",
        category: "Recursos Humanos",
        description: "Contratação de diretores, atores e produtores",
        amount: 180000
      },
      {
        id: "b2",
        category: "Infraestrutura",
        description: "Aluguel de equipamentos de som e iluminação",
        amount: 85000
      },
      {
        id: "b3",
        category: "Divulgação",
        description: "Material gráfico e marketing digital",
        amount: 45000
      },
      {
        id: "b4",
        category: "Produção",
        description: "Cenografia, figurinos e adereços",
        amount: 95000
      },
      {
        id: "b5",
        category: "Administração",
        description: "Custos administrativos e jurídicos",
        amount: 35000
      }
    ],
    checklist: [
      {
        id: "c1",
        title: "Documentação do proponente",
        completed: true
      },
      {
        id: "c2",
        title: "Plano de trabalho completo",
        completed: true
      },
      {
        id: "c3",
        title: "Orçamento detalhado",
        completed: true
      },
      {
        id: "c4",
        title: "Currículo da equipe",
        completed: false
      },
      {
        id: "c5",
        title: "Carta de anuência dos locais",
        completed: false
      },
      {
        id: "c6",
        title: "Cronograma de execução",
        completed: true
      },
      {
        id: "c7",
        title: "Plano de divulgação",
        completed: false
      },
      {
        id: "c8",
        title: "Contrapartida social definida",
        completed: true
      }
    ]
  },
  {
    id: "2",
    name: "Exposição de Arte Contemporânea",
    edital: "Edital de Artes Visuais - MinC",
    category: "Artes Visuais",
    maxBudget: 300000,
    createdAt: "2026-02-01",
    updatedAt: "2026-02-15",
    sections: [
      {
        id: "s1",
        title: "Justificativa",
        text: "Promover a arte contemporânea brasileira através de uma exposição inédita.",
        score: 55,
        suggestions: [
          "Desenvolver mais o contexto histórico e cultural",
          "Adicionar justificativas sobre a relevância dos artistas selecionados",
          "Incluir análise do cenário artístico atual"
        ],
        status: "medium",
        weight: 3
      },
      {
        id: "s2",
        title: "Objetivos",
        text: "Apresentar obras de 20 artistas emergentes.",
        score: 40,
        suggestions: [
          "Definir objetivos mais específicos e mensuráveis",
          "Incluir metas de público e engajamento",
          "Adicionar objetivos educacionais e de formação de público"
        ],
        status: "incomplete",
        weight: 2.5
      }
    ],
    budgetItems: [
      {
        id: "b1",
        category: "Curadoria",
        description: "Honorários de curadores",
        amount: 50000
      },
      {
        id: "b2",
        category: "Montagem",
        description: "Cenografia e instalação das obras",
        amount: 80000
      }
    ],
    checklist: [
      {
        id: "c1",
        title: "Documentação do proponente",
        completed: true
      },
      {
        id: "c2",
        title: "Plano curatorial",
        completed: false
      },
      {
        id: "c3",
        title: "Orçamento detalhado",
        completed: true
      },
      {
        id: "c4",
        title: "Lista de artistas participantes",
        completed: false
      }
    ]
  }
];
