import {
  Component,
  Input,
  Output,
  EventEmitter,
  ChangeDetectionStrategy,
} from '@angular/core';
import { SortByOptions } from 'altair-graphql-core/build/types/state/collection.interfaces';
import {
  GraphQLInterfaceType,
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLType,
  GraphQLAbstractType,
  GraphQLArgument,
} from 'graphql';

@Component({
  selector: 'app-doc-viewer-type',
  templateUrl: './doc-viewer-type.component.html',
  styleUrls: ['./doc-viewer-type.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DocViewerTypeComponent {
  @Input() data: any = {};
  @Input() gqlSchema: GraphQLSchema;
  @Input() sortByOption: SortByOptions = 'none';
  @Output() goToFieldChange = new EventEmitter();
  @Output() goToTypeChange = new EventEmitter();
  @Output() addToEditorChange = new EventEmitter();
  @Output() sortFieldsByChange = new EventEmitter();

  /**
   * Check if the current type is a root type
   * @param type
   */
  isRootType(type: string) {
    if (!type || !this.gqlSchema) {
      return false;
    }

    switch (type) {
      case this.gqlSchema.getQueryType() && this.gqlSchema.getQueryType()!.name:
      case this.gqlSchema.getMutationType() &&
        this.gqlSchema.getMutationType()!.name:
      case this.gqlSchema.getSubscriptionType() &&
        this.gqlSchema.getSubscriptionType()!.name:
        return true;
    }

    return false;
  }

  goToField(name: string, parentType: string) {
    this.goToFieldChange.next({ name, parentType });
  }

  goToType(name: string) {
    this.goToTypeChange.next({ name });
  }

  addToEditor(name: string, parentType: string) {
    this.addToEditorChange.next({ name, parentType });
  }

  // TODO: Move to service
  isGraphQLInterface(type: GraphQLType) {
    return type instanceof GraphQLInterfaceType;
  }
  isGraphQLObject(type: GraphQLType) {
    return type instanceof GraphQLObjectType;
  }
  /**
   * Returns an array of all the types that implement the provided type (interface)
   * @param type
   */
  getTypeImplementations(type: GraphQLType) {
    if (this.isGraphQLInterface(type)) {
      return this.gqlSchema.getPossibleTypes(type as GraphQLAbstractType) || [];
    }
    return [];
  }
  /**
   * Returns an array of all the interfaces implemented by type
   * @param type
   */
  getTypeImplements(type: GraphQLType & { getInterfaces: any }) {
    if (this.isGraphQLObject(type)) {
      return type.getInterfaces() || [];
    }
    return [];
  }

  schemaItemTrackBy(index: number, schemaItem: any) {
    return schemaItem.name;
  }

  getDefaultValue(arg: GraphQLArgument) {
    if (typeof arg.defaultValue !== 'undefined') {
      return JSON.stringify(arg.defaultValue);
    }
    return;
  }

  setSortBy(v: SortByOptions) {
    this.sortFieldsByChange.emit(v);
  }

  sortFieldsTransformer(fields: any[], sortByOption: SortByOptions) {
    switch (sortByOption) {
      case 'a-z':
        return fields.sort((a, b) => {
          const aName = a.name.toLowerCase() || '';
          const bName = b.name.toLowerCase() || '';

          if (aName > bName) {
            return 1;
          }
          if (aName < bName) {
            return -1;
          }
          return 0;
        });
      case 'z-a':
        return fields.sort((a, b) => {
          const aName = a.name.toLowerCase() || '';
          const bName = b.name.toLowerCase() || '';

          if (aName > bName) {
            return -1;
          }
          if (aName < bName) {
            return 1;
          }
          return 0;
        });
    }
    return fields;
  }
}
