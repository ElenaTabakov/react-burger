
export interface  IIngredientItem {
    _id: string,
    name: string,
    type:string,
    proteins:number,
    fat: number,
    carbohydrates: number,
    calories: number,
    price: number,
    image: string,
    image_mobile: string,
    image_large: string,
    __v: number,
}

export interface IUser {
    isAuth: boolean,
    isLoading: boolean,
    isSuccess: boolean,
    isError: boolean,
    user: {
      name: string ,
      email: string ,
    },
  }

  export interface IOrderContent {
    success: boolean;
    name: string;
    order: IOrder;
  }
  export interface IUserOrder {
      ingredients: string[],
      order: IOrderContent ,
      isLoading: boolean,
      isSuccess: boolean,
      error: string | null,
  }

  export interface IIngredientItemWithId extends IIngredientItem{
    uniqueId?: string;
  }
  
  export interface IBurgerConstructor {
    bun:IIngredientItemWithId[];
    ingredients: IIngredientItemWithId[];
}

export interface IStoreIngredients  {
  ingredients: IIngredientItem[] | [];
  isLoading: boolean;
  isSuccess: boolean,
  error: string | null,
};

export interface IOrder {
  _id: string;
  name:string;
  ingredients: string[];
  status: string;
  number: number;
  createdAt: Date | string;
  // success: boolean;
}

export interface IFormValues {
  name?: string | undefined;
  email: string;
  password: string;
}
