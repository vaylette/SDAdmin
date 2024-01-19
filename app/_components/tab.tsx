'use client'

export interface Tab<T extends string>{
    [key: string]: boolean
}

export interface TabItem<T extends string | number> {
    name: string;
    tab: T;
}
  
export interface TabProps<T extends string > {
    tab: Tab<T>;
    tabList: TabItem<T>[];
    handleActiveTab: (activeTab: T) => void;
}

export const TabComponent = <T extends string>({ tab, tabList, handleActiveTab }: TabProps<T>) => {
    return (
      <div className='flex flex-row gap-[10px]'>
        {tabList.map((item, index) => (
          <button
            key={index}
            className={`w-[128px] h-[60px] rounded-[5px] flex items-center justify-center ${
              tab[item.tab] ? 'bg-orange-default text-white-default' : 'text-orange-default border-[0.5px] border-solid border-orange-200 bg-orange-400'
            }`}
            onClick={() => handleActiveTab(item.tab)}
          >
            {item.name}
          </button>
        ))}
      </div>
    );
};
  
