export interface Subcategory {
    id: string;
    name: string;
    description?: string;
}

export interface Category {
    icon: any;
    name: string;
    description: string;
    subcategories: Subcategory[];
}

export const categoriesData: Record<string, Category> = {
    coffee: {
        icon: require("../assets/icons/coffee.png"),
        name: "Кофе",
        description: "Все в 'Sinka Kafe'",
        subcategories: [
            { id: "americano", img: require("../assets/images/coffe/image9.png"), name: "Американо", description: [{ name: "Кофе 'ARY'", currentAmount: 300, totalAmount: 1000, unit: "мл" }] },
            { id: "cappuccino", img: require("../assets/images/coffe/image8.png"), name: "Капучино", description: [
                    { name: "Сироп", currentAmount: 500, totalAmount: 2000, unit: "мл" },
                    { name: "Взбитое молоко", currentAmount: 10, totalAmount: 12, unit: "л" }
                ]},
            { id: "latte", img: require("../assets/images/coffe/image8.png"), name: "Латте", description: [
                    { name: "Сироп", currentAmount: 400, totalAmount: 1500, unit: "мл" },
                    { name: "Взбитое молоко", currentAmount: 5, totalAmount: 10, unit: "л" }
                ]},
            { id: "espresso", img: require("../assets/images/coffe/image8.png"), name: "Эспрессо", description: [{ name: "Классический эспрессо", currentAmount: 100, totalAmount: 500, unit: "мл" }] },
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
