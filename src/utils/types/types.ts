
export interface  IIngredientsProps {
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
