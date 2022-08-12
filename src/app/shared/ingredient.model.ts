export class Ingredient{
    
    private _name : string;
    public get name() : string {
        return this._name;
    }
    public set name(v : string) {
        this._name = v;
    }
    
    private _amount : number;
    public get amount() : number {
        return this._amount;
    }
    public set amount(v : number) {
        this._amount = v;
    }
    
    /**
     *
     */
    constructor(name: string, amount: number) {
        this._name = name;
        this._amount = amount;
    }
}