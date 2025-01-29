interface Subcategory {
    id: string;
    name: string;
    description?: string;
}

interface Category {
    icon: any;
    name: string;
    description: string;
    subcategories: Subcategory[];
}

export const categoriesData: Record<string, Category> = {
    coffee: {
        icon:  require("../assets/icons/coffee.png"),
        name: "Кофе",
        description: "Все в 'Sinka Kafe'",
        subcategories: [
            { id: "americano", name: "Американо", description: "Кофе 'ARY'" },
            { id: "cappuccino", name: "Капучино", description: "Сироп, взбитое молоко" },
            { id: "latte", name: "Латте", description: "Сироп, взбитое молоко" },
            { id: "espresso", name: "Эспрессо", description: "Классический эспрессо" },
        ],
    },
    bakery: {
        icon: require("../assets/icons/bakery.png"),
        name: "Выпечка",
        description: "Среди всех заведений",
        subcategories: [
            { id: "croissant", name: "Круассан сливочный", description: "Со сливочным кремом" },
            { id: "chocolate", name: "Круассан с шоколадом", description: "С начинкой из шоколада" },
        ],
    },
    syrups: {
        icon: require("../assets/icons/syrups.png"),
        name: "Сиропы",
        description: "Среди всех заведений",
        subcategories: [
            { id: "vanilla", name: "Ванильный сироп", description: "Herbarista Bourbon Vanilla" },
            { id: "caramel", name: "Карамельный сироп", description: "Herbarista Bourbon Caramel" },
        ],
    },
    viewAll: {
        icon: "",
        name: "Смотреть все",
        description: "",
        subcategories: []
    }
};
