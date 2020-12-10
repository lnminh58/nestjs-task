import { BadRequestException, PipeTransform } from '@nestjs/common';

export class EnumValueValidation implements PipeTransform {
  readonly allowedValues = [];

  constructor(definedEnum) {
    this.allowedValues = Object.values(definedEnum);
  }

  transform(value: any) {
    value = value.toUpperCase();

    if (!this.isValidValue(value)) {
      throw new BadRequestException(`"${value}" is invalid`);
    }

    return value;
  }

  private isValidValue = (value: any) => this.allowedValues.includes(value);
}
