export enum CinemaTypes {
  ZHOVTEN = "zhovten",
  SKYMALL = "skymall",
  KIEVRUS = "kievrus",
  GULLIVER = "gulliver",
  MAGELAN = "magelan",
  OSKAR_DT = "oskar_dt",
  LEYPTSIG = "leyptsig",
}

export namespace CinemaTypes {

  export function defaultType(): CinemaTypes {
    return CinemaTypes.ZHOVTEN;
  }

  export function getType(displayName: string): CinemaTypes | null {
    const item: CinemaTypesData | undefined = cinemaTypesData.find(_item => {
      return _item.displayName === displayName;
    });

    return item ? item.type : null;
  }

  export function getCinemaTypesData(): CinemaTypesData[] {
    return cinemaTypesData;
  }

  interface CinemaTypesData {
    type: CinemaTypes;
    displayName: string;
    cyrillicName: string;
  }

  const cinemaTypesData: CinemaTypesData[] = [
    {type: CinemaTypes.ZHOVTEN, displayName: "zhovten", cyrillicName: "Жовтень"},
    {type: CinemaTypes.SKYMALL, displayName: "skymall", cyrillicName: "Скаймолл"},
    {type: CinemaTypes.KIEVRUS, displayName: "kievrus", cyrillicName: "Киевская Русь"},
    {type: CinemaTypes.GULLIVER, displayName: "gulliver", cyrillicName: "Гулливер"},
    {type: CinemaTypes.MAGELAN, displayName: "magelan", cyrillicName: "Магелан"},
    {type: CinemaTypes.OSKAR_DT, displayName: "oskar_dt", cyrillicName: "Оскар Дрим Таун"},
    {type: CinemaTypes.LEYPTSIG, displayName: "leyptsig", cyrillicName: "Лейпциг"},
  ];
}
