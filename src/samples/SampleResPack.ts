

export async function WaitForTimes(ms:number):Promise<void>{
    return new Promise<void>((res,rej)=>{
        setTimeout(res,ms);
    })
}

export class SampleResPack{

    private m_loaded:boolean = false;
    private m_onload:boolean = false;
    public get isLoaded():boolean{
        return this.m_loaded;
    }
    public async load():Promise<boolean>{
        if(this.m_loaded) return true;

        if(!this.m_onload){
            this.m_onload= true;
            this.m_loaded = await this.doLoad();
        }
        else{
            while(true){
                if(this.m_loaded){
                    return true;
                }
                await WaitForTimes(2000);
            }
        }
        return true;
    }

    protected async doLoad():Promise<boolean>{
        return true;
    }
}
