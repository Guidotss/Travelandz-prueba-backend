export interface Image {
  url: string;
  type: ImageType;
}

enum ImageType {
  Extralarge = "EXTRALARGE",
  Large = "LARGE",
  Medium = "MEDIUM",
  Small = "SMALL",
}
