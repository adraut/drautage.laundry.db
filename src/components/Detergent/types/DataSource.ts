export enum DataSource {
  /** The detergent profile was created by manually entering data from the product's physical packaging. */
  Package = 'Package',
  /** The detergent profile was created by extracting data from the Safety Data Sheet (SDS) of the product. */
  SDS = 'SDS',
}
