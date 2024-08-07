export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type Database = {
  public: {
    Tables: {
      memberships: {
        Row: {
          code: string | null;
          created_at: string;
          id: number;
          invited_email: string | null;
          organization_id: number;
          role: number;
          user_id: string | null;
        };
        Insert: {
          code?: string | null;
          created_at?: string;
          id?: never;
          invited_email?: string | null;
          organization_id: number;
          role: number;
          user_id?: string | null;
        };
        Update: {
          code?: string | null;
          created_at?: string;
          id?: never;
          invited_email?: string | null;
          organization_id?: number;
          role?: number;
          user_id?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: 'memberships_organization_id_fkey';
            columns: ['organization_id'];
            isOneToOne: false;
            referencedRelation: 'organizations';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'memberships_user_id_fkey';
            columns: ['user_id'];
            isOneToOne: false;
            referencedRelation: 'users';
            referencedColumns: ['id'];
          },
        ];
      };
      organizations: {
        Row: {
          created_at: string;
          id: number;
          logo_url: string | null;
          name: string;
          uuid: string;
        };
        Insert: {
          created_at?: string;
          id?: never;
          logo_url?: string | null;
          name: string;
          uuid?: string;
        };
        Update: {
          created_at?: string;
          id?: never;
          logo_url?: string | null;
          name?: string;
          uuid?: string;
        };
        Relationships: [];
      };
      organizations_subscriptions: {
        Row: {
          customer_id: string;
          organization_id: number;
          subscription_id: string | null;
        };
        Insert: {
          customer_id: string;
          organization_id: number;
          subscription_id?: string | null;
        };
        Update: {
          customer_id?: string;
          organization_id?: number;
          subscription_id?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: 'organizations_subscriptions_organization_id_fkey';
            columns: ['organization_id'];
            isOneToOne: true;
            referencedRelation: 'organizations';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'organizations_subscriptions_subscription_id_fkey';
            columns: ['subscription_id'];
            isOneToOne: true;
            referencedRelation: 'subscriptions';
            referencedColumns: ['id'];
          },
        ];
      };
      subscriptions: {
        Row: {
          cancel_at_period_end: boolean;
          created_at: string | null;
          currency: string | null;
          id: string;
          interval: string | null;
          interval_count: number | null;
          period_ends_at: string | null;
          period_starts_at: string | null;
          price_id: string;
          status: Database['public']['Enums']['subscription_status'];
          trial_ends_at: string | null;
          trial_starts_at: string | null;
        };
        Insert: {
          cancel_at_period_end: boolean;
          created_at?: string | null;
          currency?: string | null;
          id: string;
          interval?: string | null;
          interval_count?: number | null;
          period_ends_at?: string | null;
          period_starts_at?: string | null;
          price_id: string;
          status: Database['public']['Enums']['subscription_status'];
          trial_ends_at?: string | null;
          trial_starts_at?: string | null;
        };
        Update: {
          cancel_at_period_end?: boolean;
          created_at?: string | null;
          currency?: string | null;
          id?: string;
          interval?: string | null;
          interval_count?: number | null;
          period_ends_at?: string | null;
          period_starts_at?: string | null;
          price_id?: string;
          status?: Database['public']['Enums']['subscription_status'];
          trial_ends_at?: string | null;
          trial_starts_at?: string | null;
        };
        Relationships: [];
      };
      tasks: {
        Row: {
          done: boolean;
          enrich: Json | null;
          id: number;
          name: string;
          organization_id: number;
          pdf_path: string | null;
        };
        Insert: {
          done?: boolean;
          enrich?: Json | null;
          id?: number;
          name?: string;
          organization_id: number;
          pdf_path?: string | null;
        };
        Update: {
          done?: boolean;
          enrich?: Json | null;
          id?: number;
          name?: string;
          organization_id?: number;
          pdf_path?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: 'tasks_organization_id_fkey';
            columns: ['organization_id'];
            isOneToOne: false;
            referencedRelation: 'organizations';
            referencedColumns: ['id'];
          },
        ];
      };
      users: {
        Row: {
          created_at: string;
          display_name: string | null;
          id: string;
          onboarded: boolean;
          photo_url: string | null;
          source: string | null;
        };
        Insert: {
          created_at?: string;
          display_name?: string | null;
          id: string;
          onboarded: boolean;
          photo_url?: string | null;
          source?: string | null;
        };
        Update: {
          created_at?: string;
          display_name?: string | null;
          id?: string;
          onboarded?: boolean;
          photo_url?: string | null;
          source?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: 'users_id_fkey';
            columns: ['id'];
            isOneToOne: true;
            referencedRelation: 'users';
            referencedColumns: ['id'];
          },
        ];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      accept_invite_to_organization: {
        Args: {
          invite_code: string;
          invite_user_id: string;
        };
        Returns: Json;
      };
      assert_service_role: {
        Args: Record<PropertyKey, never>;
        Returns: undefined;
      };
      can_update_user_role:
        | {
            Args: {
              membership_id: number;
            };
            Returns: boolean;
          }
        | {
            Args: {
              organization_id: number;
              membership_id: number;
            };
            Returns: boolean;
          };
      create_new_organization: {
        Args: {
          org_name: string;
          user_id: string;
          create_user: boolean;
          ref_src: string;
        };
        Returns: string;
      };
      current_user_is_member_of_organization: {
        Args: {
          organization_id: number;
        };
        Returns: boolean;
      };
      get_organizations_for_authenticated_user: {
        Args: Record<PropertyKey, never>;
        Returns: number[];
      };
      get_role_for_authenticated_user: {
        Args: {
          org_id: number;
        };
        Returns: number;
      };
      get_role_for_user: {
        Args: {
          membership_id: number;
        };
        Returns: number;
      };
      transfer_organization: {
        Args: {
          org_id: number;
          target_user_membership_id: number;
        };
        Returns: undefined;
      };
    };
    Enums: {
      subscription_status:
        | 'active'
        | 'trialing'
        | 'past_due'
        | 'canceled'
        | 'unpaid'
        | 'incomplete'
        | 'incomplete_expired'
        | 'paused';
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
};

type PublicSchema = Database[Extract<keyof Database, 'public'>];

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema['Tables'] & PublicSchema['Views'])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions['schema']]['Tables'] &
        Database[PublicTableNameOrOptions['schema']]['Views'])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions['schema']]['Tables'] &
      Database[PublicTableNameOrOptions['schema']]['Views'])[TableName] extends {
      Row: infer R;
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema['Tables'] &
        PublicSchema['Views'])
    ? (PublicSchema['Tables'] &
        PublicSchema['Views'])[PublicTableNameOrOptions] extends {
        Row: infer R;
      }
      ? R
      : never
    : never;

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema['Tables']
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions['schema']]['Tables']
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions['schema']]['Tables'][TableName] extends {
      Insert: infer I;
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema['Tables']
    ? PublicSchema['Tables'][PublicTableNameOrOptions] extends {
        Insert: infer I;
      }
      ? I
      : never
    : never;

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema['Tables']
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions['schema']]['Tables']
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions['schema']]['Tables'][TableName] extends {
      Update: infer U;
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema['Tables']
    ? PublicSchema['Tables'][PublicTableNameOrOptions] extends {
        Update: infer U;
      }
      ? U
      : never
    : never;

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema['Enums']
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions['schema']]['Enums']
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions['schema']]['Enums'][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema['Enums']
    ? PublicSchema['Enums'][PublicEnumNameOrOptions]
    : never;
