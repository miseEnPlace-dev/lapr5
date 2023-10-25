import { ValueObject } from '../../core/domain/ValueObject';
import { Guard } from '../../core/logic/Guard';
import { Result } from '../../core/logic/Result';

interface ElevatorBrandingProps {
  [key: string]: {
    brand: string;
    model: string;
  };
  branding: {
    brand: string;
    model: string;
  };
}

export class ElevatorBranding extends ValueObject<ElevatorBrandingProps> {
  get brand(): string {
    return this.props.branding.brand;
  }

  get model(): string {
    return this.props.branding.model;
  }

  private constructor(props: ElevatorBrandingProps) {
    super(props);
  }

  public static create(brand: string, model: string): Result<ElevatorBranding> {
    const guardedProps = [
      { argument: brand, argumentName: 'brand' },
      { argument: model, argumentName: 'model' }
    ];
    const guardResult = Guard.againstNullOrUndefinedBulk(guardedProps);
    if (!guardResult.succeeded) return Result.fail<ElevatorBranding>(guardResult.message);

    if (brand.length > 50)
      return Result.fail<ElevatorBranding>('Brand cannot exceed 50 characters');
    if (model.length > 50)
      return Result.fail<ElevatorBranding>('Model cannot exceed 50 characters');

    return Result.ok<ElevatorBranding>(new ElevatorBranding({ branding: { brand, model } }));
  }
}
