export interface Ingredient {
    id: string;
    img: string;
    name: string;
    currentAmount: number;
    totalAmount: number;
    unit: string;
}

export interface Subcategory {
    id: string;
    img: string;
    name: string;
    description?: Ingredient[];
}

export interface Category {
    icon: string;
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
            { id: "americano", img: require("../assets/images/coffe/image9.png"), name: "Американо", description: [
                { id: "A001", img: require("../assets/images/coffe/image9.png"),  name: "Кофе 'ARY'", currentAmount: 300, totalAmount: 1000, unit: "мл" }
                ]},
            { id: "cappuccino", img: require("../assets/images/coffe/image.png"), name: "Капучино", description: [
                    { id: "C001", img: require("../assets/images/coffe/image.png"), name: "Сироп", currentAmount: 500, totalAmount: 2000, unit: "мл" },
                    { id: "C002", img: require("../assets/images/coffe/image.png"), name: "Взбитое молоко", currentAmount: 10, totalAmount: 12, unit: "л" }
                ]},
            { id: "raf", img: require("../assets/images/coffe/image9.png"), name: "Раф", description: [
                    { id: "K001", img: require("../assets/images/products/coffe.png"), name: "Кофе “Смесь №8”", currentAmount: 400, totalAmount: 1500, unit: "мл" },
                    { id: "K002", img: require("../assets/images/products/cream.png"), name: "Сливки «Milkavita» Latte Barista,ультрапастери...", currentAmount: 5, totalAmount: 10, unit: "л" }
                ]},
            { id: "latte", img: require("../assets/images/coffe/image8.png"), name: "Латте", description: [
                    { id: "L001", img: require("../assets/images/coffe/image9.png"), name: "Сироп", currentAmount: 400, totalAmount: 1500, unit: "мл" },
                    { id: "L002", img: require("../assets/images/coffe/image9.png"), name: "Взбитое молоко", currentAmount: 5, totalAmount: 10, unit: "л" }
                ]},
            { id: "espresso", img: require("../assets/images/coffe/image9.png"), name: "Эспрессо", description: [
                { id: "E001", img: require("../assets/images/coffe/image9.png"), name: "Классический эспрессо", currentAmount: 100, totalAmount: 500, unit: "мл" }
                ]},
        ]
    },
    bakery: {
        icon: require("../assets/icons/bakery.png"),
        name: "Выпечка",
        description: "Среди всех заведений",
        subcategories: [
            { id: "croissant", img: require("../assets/images/coffe/image8.png"), name: "Круассан сливочный", description: [
                { id: "B001", img: require("../assets/images/coffe/image9.png"), name: "Со сливочным кремом", currentAmount: 50, totalAmount: 200, unit: "шт" }
                ]},
            { id: "chocolate", img: require("../assets/images/coffe/image8.png"), name: "Круассан с шоколадом", description: [
                { id: "B002", img: require("../assets/images/coffe/image9.png"), name: "С начинкой из шоколада", currentAmount: 40, totalAmount: 180, unit: "шт" }
                ]},
            { id: "danish", img: require("../assets/images/coffe/image8.png"), name: "Датская булочка", description: [
                { id: "B003", img: require("../assets/images/coffe/image9.png"), name: "С вишневым джемом", currentAmount: 30, totalAmount: 100, unit: "шт" }
                ]},
            { id: "muffin", img: require("../assets/images/coffe/image8.png"), name: "Маффин", description: [
                { id: "B004", img: require("../assets/images/coffe/image9.png"), name: "С черникой", currentAmount: 20, totalAmount: 90, unit: "шт" }
                ]}
        ]
    },
    syrups: {
        icon: require("../assets/icons/syrups.png"),
        name: "Сиропы",
        description: "Среди всех заведений",
        subcategories: [
            { id: "vanilla", img: require("../assets/images/coffe/image8.png"), name: "Ванильный сироп", description: [
                { id: "S001", img: require("../assets/images/coffe/image9.png"), name: "Herbarista Bourbon Vanilla", currentAmount: 600, totalAmount: 2500, unit: "мл" }
                ]},
            { id: "caramel", img: require("../assets/images/coffe/image8.png"), name: "Карамельный сироп", description: [
                { id: "S002", img: require("../assets/images/coffe/image9.png"), name: "Herbarista Bourbon Caramel", currentAmount: 500, totalAmount: 2200, unit: "мл" }
                ]},
            { id: "hazelnut", img: require("../assets/images/coffe/image8.png"), name: "Ореховый сироп", description: [
                { id: "S003", img: require("../assets/images/coffe/image9.png"), name: "Herbarista Hazelnut", currentAmount: 450, totalAmount: 2000, unit: "мл" }
                ]},
            { id: "chocolate", img: require("../assets/images/coffe/image8.png"), name: "Шоколадный сироп", description: [
                { id: "S004", img: require("../assets/images/coffe/image9.png"), name: "Herbarista Chocolate", currentAmount: 700, totalAmount: 2800, unit: "мл" }
                ]}
        ]
    },
    viewAll: {
        icon: "",
        name: "Смотреть все",
        description: "",
        subcategories: []
    }
};
