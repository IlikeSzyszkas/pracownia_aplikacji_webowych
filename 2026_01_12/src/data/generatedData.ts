export interface Category {
    id: number;
    name: string;
}

export interface Comment {
    id: number;
    createdAt: string;
    updatedAt: string;
    content: string;
    wpisId: number;
}

export interface Post {
    id: number;
    createdAt: string;
    updatedAt: string;
    title: string;
    content: string;
    published: boolean;
    kategoriaId: number;
    kategoria?: Category;
    komentarze?: Comment[];
}

export const categories: Category[] = [
    { id: 1, name: "Astronomia" },
    { id: 2, name: "Biologia" },
    { id: 3, name: "Ekologia" },
    { id: 4, name: "Fizyka" }
];

export const comments: Comment[] = [
    {
        id: 1,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        content: "Świetny artykuł! Bardzo pouczający.",
        wpisId: 1
    },
    {
        id: 2,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        content: "Całkowicie zgadzam się z Twoimi spostrzeżeniami.",
        wpisId: 1
    },
    {
        id: 3,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        content: "Czy możesz podzielić się więcej informacji o tym zjawisku?",
        wpisId: 2
    }
];

export const posts: Post[] = [
    {
        id: 1,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        title: "Czarne Dziury – Tajemnice Wszechświata",
        content: "Czarne dziury to jedne z najbardziej fascynujących obiektów we Wszechświecie. Powstają w wyniku grawitacyjnego zapadnięcia się masywnych gwiazd po ich śmierci. Ich grawitacja jest tak silna, że nawet światło nie może ich opuścić. W tym artykule omawiamy najnowsze odkrycia dotyczące czarnych dziur, w tym pierwsze zdjęcie horyzontu zdarzeń wykonane przez Teleskop Horyzontu Zdarzeń w 2019 roku. Badamy także teorię promieniowania Hawkinga i to, co może się dziać po drugiej stronie osobliwości.",
        published: true,
        kategoriaId: 1,
        kategoria: categories[0],
        komentarze: [comments[0], comments[1]]
    },
    {
        id: 2,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        title: "Życie w Głębinach Oceanu",
        content: "Głębiny oceaniczne to jeden z najmniej zbadanych obszarów naszej planety. Na głębokości ponad 3000 metrów, w całkowitej ciemności i pod ogromnym ciśnieniem, kwitnie zaskakująco bogate życie. Odkryliśmy tam świecące meduzy, gigantyczne kałamarnice i organizmy żyjące przy kominach hydrotermalnych. Te kominy wyrzucają gorące, mineralne wody i stanowią podstawę unikalnych ekosystemów niezależnych od energii słonecznej. To odkrycie zrewolucjonizowało nasze rozumienie granic życia na Ziemi.",
        published: true,
        kategoriaId: 2,
        kategoria: categories[1],
        komentarze: [comments[2]]
    },
    {
        id: 3,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        title: "10 Sposobów na Ochronę Bioróżnorodności",
        content: "Bioróżnorodność jest fundamentem zdrowych ekosystemów i życia na Ziemi. Niestety, działalność człowieka doprowadziła do bezprecedensowego tempa wymierania gatunków. W tym artykule przedstawiam 10 praktycznych kroków, które każdy z nas może podjąć, aby chronić przyrodę. Wskazówka nr 1: Ogranicz używanie pestycydów w ogrodzie – pozwól zapylaczom prosperować. Wskazówka nr 2: Sadź rodzime gatunki roślin, które wspierają lokalne owady i ptaki...",
        published: true,
        kategoriaId: 3,
        kategoria: categories[2],
        komentarze: []
    },
    {
        id: 4,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        title: "Ukryte Cuda Lasów Deszczowych",
        content: "Lasy deszczowe pokrywają zaledwie 6% powierzchni Ziemi, a jednak są domem dla ponad połowy wszystkich gatunków roślin i zwierząt na świecie. Amazonia, Kongo, Borneo – każdy z tych lasów kryje niezliczone tajemnice. Naukowcy szacują, że tysiące gatunków czeka jeszcze na odkrycie. Niestety, wylesianie postępuje w zastraszającym tempie. Dołącz do mnie w podróży przez te zielone płuca naszej planety i odkryj, dlaczego ich ochrona jest kluczowa dla całej ludzkości.",
        published: true,
        kategoriaId: 3,
        kategoria: categories[2],
        komentarze: []
    },
    {
        id: 5,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        title: "Kwantowa Splątaność – Fizyka Przyszłości",
        content: "Kwantowa splątaność to zjawisko, które Einstein nazywał 'upiornym działaniem na odległość'. Dwie splątane cząstki wpływają na siebie natychmiastowo, niezależnie od dzielącej je odległości. To zjawisko jest fundamentem rozwijającej się technologii komputerów kwantowych i kwantowej kryptografii. W tym przewodniku tłumaczę krok po kroku, czym jest mechanika kwantowa, jak działają kubity i dlaczego komputery kwantowe mogą zrewolucjonizować naukę i przemysł w nadchodzących dekadach.",
        published: true,
        kategoriaId: 4,
        kategoria: categories[3],
        komentarze: []
    },
    {
        id: 5,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        title: "Kwantowa Splątaność – Fizyka Przyszłości",
        content: "Kwantowa splątaność to zjawisko, które Einstein nazywał 'upiornym działaniem na odległość'. Dwie splątane cząstki wpływają na siebie natychmiastowo, niezależnie od dzielącej je odległości. To zjawisko jest fundamentem rozwijającej się technologii komputerów kwantowych i kwantowej kryptografii. W tym przewodniku tłumaczę krok po kroku, czym jest mechanika kwantowa, jak działają kubity i dlaczego komputery kwantowe mogą zrewolucjonizować naukę i przemysł w nadchodzących dekadach.",
        published: true,
        kategoriaId: 4,
        kategoria: categories[3],
        komentarze: []
    }
];