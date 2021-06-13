import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions =  {}
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  timestamptz: any;
  uuid: any;
};

/** Boolean expression to compare columns of type "String". All fields are combined with logical 'AND'. */
export type String_Comparison_Exp = {
  _eq?: Maybe<Scalars['String']>;
  _gt?: Maybe<Scalars['String']>;
  _gte?: Maybe<Scalars['String']>;
  /** does the column match the given case-insensitive pattern */
  _ilike?: Maybe<Scalars['String']>;
  _in?: Maybe<Array<Scalars['String']>>;
  /** does the column match the given POSIX regular expression, case insensitive */
  _iregex?: Maybe<Scalars['String']>;
  _is_null?: Maybe<Scalars['Boolean']>;
  /** does the column match the given pattern */
  _like?: Maybe<Scalars['String']>;
  _lt?: Maybe<Scalars['String']>;
  _lte?: Maybe<Scalars['String']>;
  _neq?: Maybe<Scalars['String']>;
  /** does the column NOT match the given case-insensitive pattern */
  _nilike?: Maybe<Scalars['String']>;
  _nin?: Maybe<Array<Scalars['String']>>;
  /** does the column NOT match the given POSIX regular expression, case insensitive */
  _niregex?: Maybe<Scalars['String']>;
  /** does the column NOT match the given pattern */
  _nlike?: Maybe<Scalars['String']>;
  /** does the column NOT match the given POSIX regular expression, case sensitive */
  _nregex?: Maybe<Scalars['String']>;
  /** does the column NOT match the given SQL regular expression */
  _nsimilar?: Maybe<Scalars['String']>;
  /** does the column match the given POSIX regular expression, case sensitive */
  _regex?: Maybe<Scalars['String']>;
  /** does the column match the given SQL regular expression */
  _similar?: Maybe<Scalars['String']>;
};

/** columns and relationships of "comments" */
export type Comments = {
  __typename?: 'comments';
  created_at: Scalars['timestamptz'];
  id: Scalars['uuid'];
  /** An object relationship */
  issue: Issues;
  issue_id: Scalars['uuid'];
  text: Scalars['String'];
  updated_at: Scalars['timestamptz'];
  /** An object relationship */
  user: Users;
  user_id: Scalars['String'];
};

/** aggregated selection of "comments" */
export type Comments_Aggregate = {
  __typename?: 'comments_aggregate';
  aggregate?: Maybe<Comments_Aggregate_Fields>;
  nodes: Array<Comments>;
};

/** aggregate fields of "comments" */
export type Comments_Aggregate_Fields = {
  __typename?: 'comments_aggregate_fields';
  count: Scalars['Int'];
  max?: Maybe<Comments_Max_Fields>;
  min?: Maybe<Comments_Min_Fields>;
};


/** aggregate fields of "comments" */
export type Comments_Aggregate_FieldsCountArgs = {
  columns?: Maybe<Array<Comments_Select_Column>>;
  distinct?: Maybe<Scalars['Boolean']>;
};

/** order by aggregate values of table "comments" */
export type Comments_Aggregate_Order_By = {
  count?: Maybe<Order_By>;
  max?: Maybe<Comments_Max_Order_By>;
  min?: Maybe<Comments_Min_Order_By>;
};

/** input type for inserting array relation for remote table "comments" */
export type Comments_Arr_Rel_Insert_Input = {
  data: Array<Comments_Insert_Input>;
  /** on conflict condition */
  on_conflict?: Maybe<Comments_On_Conflict>;
};

/** Boolean expression to filter rows from the table "comments". All fields are combined with a logical 'AND'. */
export type Comments_Bool_Exp = {
  _and?: Maybe<Array<Comments_Bool_Exp>>;
  _not?: Maybe<Comments_Bool_Exp>;
  _or?: Maybe<Array<Comments_Bool_Exp>>;
  created_at?: Maybe<Timestamptz_Comparison_Exp>;
  id?: Maybe<Uuid_Comparison_Exp>;
  issue?: Maybe<Issues_Bool_Exp>;
  issue_id?: Maybe<Uuid_Comparison_Exp>;
  text?: Maybe<String_Comparison_Exp>;
  updated_at?: Maybe<Timestamptz_Comparison_Exp>;
  user?: Maybe<Users_Bool_Exp>;
  user_id?: Maybe<String_Comparison_Exp>;
};

/** unique or primary key constraints on table "comments" */
export enum Comments_Constraint {
  /** unique or primary key constraint */
  CommentsPkey = 'comments_pkey'
}

/** input type for inserting data into table "comments" */
export type Comments_Insert_Input = {
  created_at?: Maybe<Scalars['timestamptz']>;
  id?: Maybe<Scalars['uuid']>;
  issue?: Maybe<Issues_Obj_Rel_Insert_Input>;
  issue_id?: Maybe<Scalars['uuid']>;
  text?: Maybe<Scalars['String']>;
  updated_at?: Maybe<Scalars['timestamptz']>;
  user?: Maybe<Users_Obj_Rel_Insert_Input>;
  user_id?: Maybe<Scalars['String']>;
};

/** aggregate max on columns */
export type Comments_Max_Fields = {
  __typename?: 'comments_max_fields';
  created_at?: Maybe<Scalars['timestamptz']>;
  id?: Maybe<Scalars['uuid']>;
  issue_id?: Maybe<Scalars['uuid']>;
  text?: Maybe<Scalars['String']>;
  updated_at?: Maybe<Scalars['timestamptz']>;
  user_id?: Maybe<Scalars['String']>;
};

/** order by max() on columns of table "comments" */
export type Comments_Max_Order_By = {
  created_at?: Maybe<Order_By>;
  id?: Maybe<Order_By>;
  issue_id?: Maybe<Order_By>;
  text?: Maybe<Order_By>;
  updated_at?: Maybe<Order_By>;
  user_id?: Maybe<Order_By>;
};

/** aggregate min on columns */
export type Comments_Min_Fields = {
  __typename?: 'comments_min_fields';
  created_at?: Maybe<Scalars['timestamptz']>;
  id?: Maybe<Scalars['uuid']>;
  issue_id?: Maybe<Scalars['uuid']>;
  text?: Maybe<Scalars['String']>;
  updated_at?: Maybe<Scalars['timestamptz']>;
  user_id?: Maybe<Scalars['String']>;
};

/** order by min() on columns of table "comments" */
export type Comments_Min_Order_By = {
  created_at?: Maybe<Order_By>;
  id?: Maybe<Order_By>;
  issue_id?: Maybe<Order_By>;
  text?: Maybe<Order_By>;
  updated_at?: Maybe<Order_By>;
  user_id?: Maybe<Order_By>;
};

/** response of any mutation on the table "comments" */
export type Comments_Mutation_Response = {
  __typename?: 'comments_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int'];
  /** data from the rows affected by the mutation */
  returning: Array<Comments>;
};

/** on conflict condition type for table "comments" */
export type Comments_On_Conflict = {
  constraint: Comments_Constraint;
  update_columns?: Array<Comments_Update_Column>;
  where?: Maybe<Comments_Bool_Exp>;
};

/** Ordering options when selecting data from "comments". */
export type Comments_Order_By = {
  created_at?: Maybe<Order_By>;
  id?: Maybe<Order_By>;
  issue?: Maybe<Issues_Order_By>;
  issue_id?: Maybe<Order_By>;
  text?: Maybe<Order_By>;
  updated_at?: Maybe<Order_By>;
  user?: Maybe<Users_Order_By>;
  user_id?: Maybe<Order_By>;
};

/** primary key columns input for table: comments */
export type Comments_Pk_Columns_Input = {
  id: Scalars['uuid'];
};

/** select columns of table "comments" */
export enum Comments_Select_Column {
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  Id = 'id',
  /** column name */
  IssueId = 'issue_id',
  /** column name */
  Text = 'text',
  /** column name */
  UpdatedAt = 'updated_at',
  /** column name */
  UserId = 'user_id'
}

/** input type for updating data in table "comments" */
export type Comments_Set_Input = {
  created_at?: Maybe<Scalars['timestamptz']>;
  id?: Maybe<Scalars['uuid']>;
  issue_id?: Maybe<Scalars['uuid']>;
  text?: Maybe<Scalars['String']>;
  updated_at?: Maybe<Scalars['timestamptz']>;
  user_id?: Maybe<Scalars['String']>;
};

/** update columns of table "comments" */
export enum Comments_Update_Column {
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  Id = 'id',
  /** column name */
  IssueId = 'issue_id',
  /** column name */
  Text = 'text',
  /** column name */
  UpdatedAt = 'updated_at',
  /** column name */
  UserId = 'user_id'
}

/** columns and relationships of "issues" */
export type Issues = {
  __typename?: 'issues';
  /** An array relationship */
  comments: Array<Comments>;
  /** An aggregate relationship */
  comments_aggregate: Comments_Aggregate;
  created_at: Scalars['timestamptz'];
  description: Scalars['String'];
  id: Scalars['uuid'];
  /** An object relationship */
  issue_owner?: Maybe<Users>;
  owner_id?: Maybe<Scalars['String']>;
  /** An object relationship */
  project: Projects;
  project_id: Scalars['uuid'];
  status: Scalars['String'];
  title: Scalars['String'];
  updated_at: Scalars['timestamptz'];
};


/** columns and relationships of "issues" */
export type IssuesCommentsArgs = {
  distinct_on?: Maybe<Array<Comments_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Comments_Order_By>>;
  where?: Maybe<Comments_Bool_Exp>;
};


/** columns and relationships of "issues" */
export type IssuesComments_AggregateArgs = {
  distinct_on?: Maybe<Array<Comments_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Comments_Order_By>>;
  where?: Maybe<Comments_Bool_Exp>;
};

/** aggregated selection of "issues" */
export type Issues_Aggregate = {
  __typename?: 'issues_aggregate';
  aggregate?: Maybe<Issues_Aggregate_Fields>;
  nodes: Array<Issues>;
};

/** aggregate fields of "issues" */
export type Issues_Aggregate_Fields = {
  __typename?: 'issues_aggregate_fields';
  count: Scalars['Int'];
  max?: Maybe<Issues_Max_Fields>;
  min?: Maybe<Issues_Min_Fields>;
};


/** aggregate fields of "issues" */
export type Issues_Aggregate_FieldsCountArgs = {
  columns?: Maybe<Array<Issues_Select_Column>>;
  distinct?: Maybe<Scalars['Boolean']>;
};

/** order by aggregate values of table "issues" */
export type Issues_Aggregate_Order_By = {
  count?: Maybe<Order_By>;
  max?: Maybe<Issues_Max_Order_By>;
  min?: Maybe<Issues_Min_Order_By>;
};

/** input type for inserting array relation for remote table "issues" */
export type Issues_Arr_Rel_Insert_Input = {
  data: Array<Issues_Insert_Input>;
  /** on conflict condition */
  on_conflict?: Maybe<Issues_On_Conflict>;
};

/** Boolean expression to filter rows from the table "issues". All fields are combined with a logical 'AND'. */
export type Issues_Bool_Exp = {
  _and?: Maybe<Array<Issues_Bool_Exp>>;
  _not?: Maybe<Issues_Bool_Exp>;
  _or?: Maybe<Array<Issues_Bool_Exp>>;
  comments?: Maybe<Comments_Bool_Exp>;
  created_at?: Maybe<Timestamptz_Comparison_Exp>;
  description?: Maybe<String_Comparison_Exp>;
  id?: Maybe<Uuid_Comparison_Exp>;
  issue_owner?: Maybe<Users_Bool_Exp>;
  owner_id?: Maybe<String_Comparison_Exp>;
  project?: Maybe<Projects_Bool_Exp>;
  project_id?: Maybe<Uuid_Comparison_Exp>;
  status?: Maybe<String_Comparison_Exp>;
  title?: Maybe<String_Comparison_Exp>;
  updated_at?: Maybe<Timestamptz_Comparison_Exp>;
};

/** unique or primary key constraints on table "issues" */
export enum Issues_Constraint {
  /** unique or primary key constraint */
  IssuesPkey = 'issues_pkey'
}

/** input type for inserting data into table "issues" */
export type Issues_Insert_Input = {
  comments?: Maybe<Comments_Arr_Rel_Insert_Input>;
  created_at?: Maybe<Scalars['timestamptz']>;
  description?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['uuid']>;
  issue_owner?: Maybe<Users_Obj_Rel_Insert_Input>;
  owner_id?: Maybe<Scalars['String']>;
  project?: Maybe<Projects_Obj_Rel_Insert_Input>;
  project_id?: Maybe<Scalars['uuid']>;
  status?: Maybe<Scalars['String']>;
  title?: Maybe<Scalars['String']>;
  updated_at?: Maybe<Scalars['timestamptz']>;
};

/** aggregate max on columns */
export type Issues_Max_Fields = {
  __typename?: 'issues_max_fields';
  created_at?: Maybe<Scalars['timestamptz']>;
  description?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['uuid']>;
  owner_id?: Maybe<Scalars['String']>;
  project_id?: Maybe<Scalars['uuid']>;
  status?: Maybe<Scalars['String']>;
  title?: Maybe<Scalars['String']>;
  updated_at?: Maybe<Scalars['timestamptz']>;
};

/** order by max() on columns of table "issues" */
export type Issues_Max_Order_By = {
  created_at?: Maybe<Order_By>;
  description?: Maybe<Order_By>;
  id?: Maybe<Order_By>;
  owner_id?: Maybe<Order_By>;
  project_id?: Maybe<Order_By>;
  status?: Maybe<Order_By>;
  title?: Maybe<Order_By>;
  updated_at?: Maybe<Order_By>;
};

/** aggregate min on columns */
export type Issues_Min_Fields = {
  __typename?: 'issues_min_fields';
  created_at?: Maybe<Scalars['timestamptz']>;
  description?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['uuid']>;
  owner_id?: Maybe<Scalars['String']>;
  project_id?: Maybe<Scalars['uuid']>;
  status?: Maybe<Scalars['String']>;
  title?: Maybe<Scalars['String']>;
  updated_at?: Maybe<Scalars['timestamptz']>;
};

/** order by min() on columns of table "issues" */
export type Issues_Min_Order_By = {
  created_at?: Maybe<Order_By>;
  description?: Maybe<Order_By>;
  id?: Maybe<Order_By>;
  owner_id?: Maybe<Order_By>;
  project_id?: Maybe<Order_By>;
  status?: Maybe<Order_By>;
  title?: Maybe<Order_By>;
  updated_at?: Maybe<Order_By>;
};

/** response of any mutation on the table "issues" */
export type Issues_Mutation_Response = {
  __typename?: 'issues_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int'];
  /** data from the rows affected by the mutation */
  returning: Array<Issues>;
};

/** input type for inserting object relation for remote table "issues" */
export type Issues_Obj_Rel_Insert_Input = {
  data: Issues_Insert_Input;
  /** on conflict condition */
  on_conflict?: Maybe<Issues_On_Conflict>;
};

/** on conflict condition type for table "issues" */
export type Issues_On_Conflict = {
  constraint: Issues_Constraint;
  update_columns?: Array<Issues_Update_Column>;
  where?: Maybe<Issues_Bool_Exp>;
};

/** Ordering options when selecting data from "issues". */
export type Issues_Order_By = {
  comments_aggregate?: Maybe<Comments_Aggregate_Order_By>;
  created_at?: Maybe<Order_By>;
  description?: Maybe<Order_By>;
  id?: Maybe<Order_By>;
  issue_owner?: Maybe<Users_Order_By>;
  owner_id?: Maybe<Order_By>;
  project?: Maybe<Projects_Order_By>;
  project_id?: Maybe<Order_By>;
  status?: Maybe<Order_By>;
  title?: Maybe<Order_By>;
  updated_at?: Maybe<Order_By>;
};

/** primary key columns input for table: issues */
export type Issues_Pk_Columns_Input = {
  id: Scalars['uuid'];
};

/** select columns of table "issues" */
export enum Issues_Select_Column {
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  Description = 'description',
  /** column name */
  Id = 'id',
  /** column name */
  OwnerId = 'owner_id',
  /** column name */
  ProjectId = 'project_id',
  /** column name */
  Status = 'status',
  /** column name */
  Title = 'title',
  /** column name */
  UpdatedAt = 'updated_at'
}

/** input type for updating data in table "issues" */
export type Issues_Set_Input = {
  created_at?: Maybe<Scalars['timestamptz']>;
  description?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['uuid']>;
  owner_id?: Maybe<Scalars['String']>;
  project_id?: Maybe<Scalars['uuid']>;
  status?: Maybe<Scalars['String']>;
  title?: Maybe<Scalars['String']>;
  updated_at?: Maybe<Scalars['timestamptz']>;
};

/** update columns of table "issues" */
export enum Issues_Update_Column {
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  Description = 'description',
  /** column name */
  Id = 'id',
  /** column name */
  OwnerId = 'owner_id',
  /** column name */
  ProjectId = 'project_id',
  /** column name */
  Status = 'status',
  /** column name */
  Title = 'title',
  /** column name */
  UpdatedAt = 'updated_at'
}

/** mutation root */
export type Mutation_Root = {
  __typename?: 'mutation_root';
  /** delete data from the table: "comments" */
  delete_comments?: Maybe<Comments_Mutation_Response>;
  /** delete single row from the table: "comments" */
  delete_comments_by_pk?: Maybe<Comments>;
  /** delete data from the table: "issues" */
  delete_issues?: Maybe<Issues_Mutation_Response>;
  /** delete single row from the table: "issues" */
  delete_issues_by_pk?: Maybe<Issues>;
  /** delete data from the table: "project_members" */
  delete_project_members?: Maybe<Project_Members_Mutation_Response>;
  /** delete single row from the table: "project_members" */
  delete_project_members_by_pk?: Maybe<Project_Members>;
  /** delete data from the table: "projects" */
  delete_projects?: Maybe<Projects_Mutation_Response>;
  /** delete single row from the table: "projects" */
  delete_projects_by_pk?: Maybe<Projects>;
  /** delete data from the table: "user_private" */
  delete_user_private?: Maybe<User_Private_Mutation_Response>;
  /** delete data from the table: "user_type" */
  delete_user_type?: Maybe<User_Type_Mutation_Response>;
  /** delete single row from the table: "user_type" */
  delete_user_type_by_pk?: Maybe<User_Type>;
  /** delete data from the table: "users" */
  delete_users?: Maybe<Users_Mutation_Response>;
  /** delete single row from the table: "users" */
  delete_users_by_pk?: Maybe<Users>;
  /** insert data into the table: "comments" */
  insert_comments?: Maybe<Comments_Mutation_Response>;
  /** insert a single row into the table: "comments" */
  insert_comments_one?: Maybe<Comments>;
  /** insert data into the table: "issues" */
  insert_issues?: Maybe<Issues_Mutation_Response>;
  /** insert a single row into the table: "issues" */
  insert_issues_one?: Maybe<Issues>;
  /** insert data into the table: "project_members" */
  insert_project_members?: Maybe<Project_Members_Mutation_Response>;
  /** insert a single row into the table: "project_members" */
  insert_project_members_one?: Maybe<Project_Members>;
  /** insert data into the table: "projects" */
  insert_projects?: Maybe<Projects_Mutation_Response>;
  /** insert a single row into the table: "projects" */
  insert_projects_one?: Maybe<Projects>;
  /** insert data into the table: "user_private" */
  insert_user_private?: Maybe<User_Private_Mutation_Response>;
  /** insert a single row into the table: "user_private" */
  insert_user_private_one?: Maybe<User_Private>;
  /** insert data into the table: "user_type" */
  insert_user_type?: Maybe<User_Type_Mutation_Response>;
  /** insert a single row into the table: "user_type" */
  insert_user_type_one?: Maybe<User_Type>;
  /** insert data into the table: "users" */
  insert_users?: Maybe<Users_Mutation_Response>;
  /** insert a single row into the table: "users" */
  insert_users_one?: Maybe<Users>;
  /** update data of the table: "comments" */
  update_comments?: Maybe<Comments_Mutation_Response>;
  /** update single row of the table: "comments" */
  update_comments_by_pk?: Maybe<Comments>;
  /** update data of the table: "issues" */
  update_issues?: Maybe<Issues_Mutation_Response>;
  /** update single row of the table: "issues" */
  update_issues_by_pk?: Maybe<Issues>;
  /** update data of the table: "project_members" */
  update_project_members?: Maybe<Project_Members_Mutation_Response>;
  /** update single row of the table: "project_members" */
  update_project_members_by_pk?: Maybe<Project_Members>;
  /** update data of the table: "projects" */
  update_projects?: Maybe<Projects_Mutation_Response>;
  /** update single row of the table: "projects" */
  update_projects_by_pk?: Maybe<Projects>;
  /** update data of the table: "user_private" */
  update_user_private?: Maybe<User_Private_Mutation_Response>;
  /** update data of the table: "user_type" */
  update_user_type?: Maybe<User_Type_Mutation_Response>;
  /** update single row of the table: "user_type" */
  update_user_type_by_pk?: Maybe<User_Type>;
  /** update data of the table: "users" */
  update_users?: Maybe<Users_Mutation_Response>;
  /** update single row of the table: "users" */
  update_users_by_pk?: Maybe<Users>;
};


/** mutation root */
export type Mutation_RootDelete_CommentsArgs = {
  where: Comments_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Comments_By_PkArgs = {
  id: Scalars['uuid'];
};


/** mutation root */
export type Mutation_RootDelete_IssuesArgs = {
  where: Issues_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Issues_By_PkArgs = {
  id: Scalars['uuid'];
};


/** mutation root */
export type Mutation_RootDelete_Project_MembersArgs = {
  where: Project_Members_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Project_Members_By_PkArgs = {
  id: Scalars['uuid'];
};


/** mutation root */
export type Mutation_RootDelete_ProjectsArgs = {
  where: Projects_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Projects_By_PkArgs = {
  id: Scalars['uuid'];
};


/** mutation root */
export type Mutation_RootDelete_User_PrivateArgs = {
  where: User_Private_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_User_TypeArgs = {
  where: User_Type_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_User_Type_By_PkArgs = {
  id: Scalars['uuid'];
};


/** mutation root */
export type Mutation_RootDelete_UsersArgs = {
  where: Users_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Users_By_PkArgs = {
  id: Scalars['String'];
};


/** mutation root */
export type Mutation_RootInsert_CommentsArgs = {
  objects: Array<Comments_Insert_Input>;
  on_conflict?: Maybe<Comments_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Comments_OneArgs = {
  object: Comments_Insert_Input;
  on_conflict?: Maybe<Comments_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_IssuesArgs = {
  objects: Array<Issues_Insert_Input>;
  on_conflict?: Maybe<Issues_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Issues_OneArgs = {
  object: Issues_Insert_Input;
  on_conflict?: Maybe<Issues_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Project_MembersArgs = {
  objects: Array<Project_Members_Insert_Input>;
  on_conflict?: Maybe<Project_Members_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Project_Members_OneArgs = {
  object: Project_Members_Insert_Input;
  on_conflict?: Maybe<Project_Members_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_ProjectsArgs = {
  objects: Array<Projects_Insert_Input>;
  on_conflict?: Maybe<Projects_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Projects_OneArgs = {
  object: Projects_Insert_Input;
  on_conflict?: Maybe<Projects_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_User_PrivateArgs = {
  objects: Array<User_Private_Insert_Input>;
};


/** mutation root */
export type Mutation_RootInsert_User_Private_OneArgs = {
  object: User_Private_Insert_Input;
};


/** mutation root */
export type Mutation_RootInsert_User_TypeArgs = {
  objects: Array<User_Type_Insert_Input>;
  on_conflict?: Maybe<User_Type_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_User_Type_OneArgs = {
  object: User_Type_Insert_Input;
  on_conflict?: Maybe<User_Type_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_UsersArgs = {
  objects: Array<Users_Insert_Input>;
  on_conflict?: Maybe<Users_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Users_OneArgs = {
  object: Users_Insert_Input;
  on_conflict?: Maybe<Users_On_Conflict>;
};


/** mutation root */
export type Mutation_RootUpdate_CommentsArgs = {
  _set?: Maybe<Comments_Set_Input>;
  where: Comments_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Comments_By_PkArgs = {
  _set?: Maybe<Comments_Set_Input>;
  pk_columns: Comments_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_IssuesArgs = {
  _set?: Maybe<Issues_Set_Input>;
  where: Issues_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Issues_By_PkArgs = {
  _set?: Maybe<Issues_Set_Input>;
  pk_columns: Issues_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_Project_MembersArgs = {
  _set?: Maybe<Project_Members_Set_Input>;
  where: Project_Members_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Project_Members_By_PkArgs = {
  _set?: Maybe<Project_Members_Set_Input>;
  pk_columns: Project_Members_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_ProjectsArgs = {
  _set?: Maybe<Projects_Set_Input>;
  where: Projects_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Projects_By_PkArgs = {
  _set?: Maybe<Projects_Set_Input>;
  pk_columns: Projects_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_User_PrivateArgs = {
  _set?: Maybe<User_Private_Set_Input>;
  where: User_Private_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_User_TypeArgs = {
  _set?: Maybe<User_Type_Set_Input>;
  where: User_Type_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_User_Type_By_PkArgs = {
  _set?: Maybe<User_Type_Set_Input>;
  pk_columns: User_Type_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_UsersArgs = {
  _set?: Maybe<Users_Set_Input>;
  where: Users_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Users_By_PkArgs = {
  _set?: Maybe<Users_Set_Input>;
  pk_columns: Users_Pk_Columns_Input;
};

/** column ordering options */
export enum Order_By {
  /** in ascending order, nulls last */
  Asc = 'asc',
  /** in ascending order, nulls first */
  AscNullsFirst = 'asc_nulls_first',
  /** in ascending order, nulls last */
  AscNullsLast = 'asc_nulls_last',
  /** in descending order, nulls first */
  Desc = 'desc',
  /** in descending order, nulls first */
  DescNullsFirst = 'desc_nulls_first',
  /** in descending order, nulls last */
  DescNullsLast = 'desc_nulls_last'
}

/** columns and relationships of "project_members" */
export type Project_Members = {
  __typename?: 'project_members';
  id: Scalars['uuid'];
  /** An object relationship */
  project: Projects;
  project_id: Scalars['uuid'];
  type_id: Scalars['uuid'];
  /** An object relationship */
  user?: Maybe<Users>;
  user_id?: Maybe<Scalars['String']>;
};

/** aggregated selection of "project_members" */
export type Project_Members_Aggregate = {
  __typename?: 'project_members_aggregate';
  aggregate?: Maybe<Project_Members_Aggregate_Fields>;
  nodes: Array<Project_Members>;
};

/** aggregate fields of "project_members" */
export type Project_Members_Aggregate_Fields = {
  __typename?: 'project_members_aggregate_fields';
  count: Scalars['Int'];
  max?: Maybe<Project_Members_Max_Fields>;
  min?: Maybe<Project_Members_Min_Fields>;
};


/** aggregate fields of "project_members" */
export type Project_Members_Aggregate_FieldsCountArgs = {
  columns?: Maybe<Array<Project_Members_Select_Column>>;
  distinct?: Maybe<Scalars['Boolean']>;
};

/** order by aggregate values of table "project_members" */
export type Project_Members_Aggregate_Order_By = {
  count?: Maybe<Order_By>;
  max?: Maybe<Project_Members_Max_Order_By>;
  min?: Maybe<Project_Members_Min_Order_By>;
};

/** input type for inserting array relation for remote table "project_members" */
export type Project_Members_Arr_Rel_Insert_Input = {
  data: Array<Project_Members_Insert_Input>;
  /** on conflict condition */
  on_conflict?: Maybe<Project_Members_On_Conflict>;
};

/** Boolean expression to filter rows from the table "project_members". All fields are combined with a logical 'AND'. */
export type Project_Members_Bool_Exp = {
  _and?: Maybe<Array<Project_Members_Bool_Exp>>;
  _not?: Maybe<Project_Members_Bool_Exp>;
  _or?: Maybe<Array<Project_Members_Bool_Exp>>;
  id?: Maybe<Uuid_Comparison_Exp>;
  project?: Maybe<Projects_Bool_Exp>;
  project_id?: Maybe<Uuid_Comparison_Exp>;
  type_id?: Maybe<Uuid_Comparison_Exp>;
  user?: Maybe<Users_Bool_Exp>;
  user_id?: Maybe<String_Comparison_Exp>;
};

/** unique or primary key constraints on table "project_members" */
export enum Project_Members_Constraint {
  /** unique or primary key constraint */
  ProjectMembersPkey = 'project_members_pkey'
}

/** input type for inserting data into table "project_members" */
export type Project_Members_Insert_Input = {
  id?: Maybe<Scalars['uuid']>;
  project?: Maybe<Projects_Obj_Rel_Insert_Input>;
  project_id?: Maybe<Scalars['uuid']>;
  type_id?: Maybe<Scalars['uuid']>;
  user?: Maybe<Users_Obj_Rel_Insert_Input>;
  user_id?: Maybe<Scalars['String']>;
};

/** aggregate max on columns */
export type Project_Members_Max_Fields = {
  __typename?: 'project_members_max_fields';
  id?: Maybe<Scalars['uuid']>;
  project_id?: Maybe<Scalars['uuid']>;
  type_id?: Maybe<Scalars['uuid']>;
  user_id?: Maybe<Scalars['String']>;
};

/** order by max() on columns of table "project_members" */
export type Project_Members_Max_Order_By = {
  id?: Maybe<Order_By>;
  project_id?: Maybe<Order_By>;
  type_id?: Maybe<Order_By>;
  user_id?: Maybe<Order_By>;
};

/** aggregate min on columns */
export type Project_Members_Min_Fields = {
  __typename?: 'project_members_min_fields';
  id?: Maybe<Scalars['uuid']>;
  project_id?: Maybe<Scalars['uuid']>;
  type_id?: Maybe<Scalars['uuid']>;
  user_id?: Maybe<Scalars['String']>;
};

/** order by min() on columns of table "project_members" */
export type Project_Members_Min_Order_By = {
  id?: Maybe<Order_By>;
  project_id?: Maybe<Order_By>;
  type_id?: Maybe<Order_By>;
  user_id?: Maybe<Order_By>;
};

/** response of any mutation on the table "project_members" */
export type Project_Members_Mutation_Response = {
  __typename?: 'project_members_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int'];
  /** data from the rows affected by the mutation */
  returning: Array<Project_Members>;
};

/** on conflict condition type for table "project_members" */
export type Project_Members_On_Conflict = {
  constraint: Project_Members_Constraint;
  update_columns?: Array<Project_Members_Update_Column>;
  where?: Maybe<Project_Members_Bool_Exp>;
};

/** Ordering options when selecting data from "project_members". */
export type Project_Members_Order_By = {
  id?: Maybe<Order_By>;
  project?: Maybe<Projects_Order_By>;
  project_id?: Maybe<Order_By>;
  type_id?: Maybe<Order_By>;
  user?: Maybe<Users_Order_By>;
  user_id?: Maybe<Order_By>;
};

/** primary key columns input for table: project_members */
export type Project_Members_Pk_Columns_Input = {
  id: Scalars['uuid'];
};

/** select columns of table "project_members" */
export enum Project_Members_Select_Column {
  /** column name */
  Id = 'id',
  /** column name */
  ProjectId = 'project_id',
  /** column name */
  TypeId = 'type_id',
  /** column name */
  UserId = 'user_id'
}

/** input type for updating data in table "project_members" */
export type Project_Members_Set_Input = {
  id?: Maybe<Scalars['uuid']>;
  project_id?: Maybe<Scalars['uuid']>;
  type_id?: Maybe<Scalars['uuid']>;
  user_id?: Maybe<Scalars['String']>;
};

/** update columns of table "project_members" */
export enum Project_Members_Update_Column {
  /** column name */
  Id = 'id',
  /** column name */
  ProjectId = 'project_id',
  /** column name */
  TypeId = 'type_id',
  /** column name */
  UserId = 'user_id'
}

/** columns and relationships of "projects" */
export type Projects = {
  __typename?: 'projects';
  created_at: Scalars['timestamptz'];
  description?: Maybe<Scalars['String']>;
  id: Scalars['uuid'];
  /** An array relationship */
  issues: Array<Issues>;
  /** An aggregate relationship */
  issues_aggregate: Issues_Aggregate;
  owner_id: Scalars['String'];
  /** fetch data from the table: "project_members" */
  project_members: Array<Project_Members>;
  /** An aggregate relationship */
  project_members_aggregate: Project_Members_Aggregate;
  /** An object relationship */
  project_owner: Users;
  title: Scalars['String'];
  updated_at?: Maybe<Scalars['timestamptz']>;
  url?: Maybe<Scalars['String']>;
};


/** columns and relationships of "projects" */
export type ProjectsIssuesArgs = {
  distinct_on?: Maybe<Array<Issues_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Issues_Order_By>>;
  where?: Maybe<Issues_Bool_Exp>;
};


/** columns and relationships of "projects" */
export type ProjectsIssues_AggregateArgs = {
  distinct_on?: Maybe<Array<Issues_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Issues_Order_By>>;
  where?: Maybe<Issues_Bool_Exp>;
};


/** columns and relationships of "projects" */
export type ProjectsProject_MembersArgs = {
  distinct_on?: Maybe<Array<Project_Members_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Project_Members_Order_By>>;
  where?: Maybe<Project_Members_Bool_Exp>;
};


/** columns and relationships of "projects" */
export type ProjectsProject_Members_AggregateArgs = {
  distinct_on?: Maybe<Array<Project_Members_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Project_Members_Order_By>>;
  where?: Maybe<Project_Members_Bool_Exp>;
};

/** aggregated selection of "projects" */
export type Projects_Aggregate = {
  __typename?: 'projects_aggregate';
  aggregate?: Maybe<Projects_Aggregate_Fields>;
  nodes: Array<Projects>;
};

/** aggregate fields of "projects" */
export type Projects_Aggregate_Fields = {
  __typename?: 'projects_aggregate_fields';
  count: Scalars['Int'];
  max?: Maybe<Projects_Max_Fields>;
  min?: Maybe<Projects_Min_Fields>;
};


/** aggregate fields of "projects" */
export type Projects_Aggregate_FieldsCountArgs = {
  columns?: Maybe<Array<Projects_Select_Column>>;
  distinct?: Maybe<Scalars['Boolean']>;
};

/** order by aggregate values of table "projects" */
export type Projects_Aggregate_Order_By = {
  count?: Maybe<Order_By>;
  max?: Maybe<Projects_Max_Order_By>;
  min?: Maybe<Projects_Min_Order_By>;
};

/** input type for inserting array relation for remote table "projects" */
export type Projects_Arr_Rel_Insert_Input = {
  data: Array<Projects_Insert_Input>;
  /** on conflict condition */
  on_conflict?: Maybe<Projects_On_Conflict>;
};

/** Boolean expression to filter rows from the table "projects". All fields are combined with a logical 'AND'. */
export type Projects_Bool_Exp = {
  _and?: Maybe<Array<Projects_Bool_Exp>>;
  _not?: Maybe<Projects_Bool_Exp>;
  _or?: Maybe<Array<Projects_Bool_Exp>>;
  created_at?: Maybe<Timestamptz_Comparison_Exp>;
  description?: Maybe<String_Comparison_Exp>;
  id?: Maybe<Uuid_Comparison_Exp>;
  issues?: Maybe<Issues_Bool_Exp>;
  owner_id?: Maybe<String_Comparison_Exp>;
  project_members?: Maybe<Project_Members_Bool_Exp>;
  project_owner?: Maybe<Users_Bool_Exp>;
  title?: Maybe<String_Comparison_Exp>;
  updated_at?: Maybe<Timestamptz_Comparison_Exp>;
  url?: Maybe<String_Comparison_Exp>;
};

/** unique or primary key constraints on table "projects" */
export enum Projects_Constraint {
  /** unique or primary key constraint */
  ProjectsPkey = 'projects_pkey'
}

/** input type for inserting data into table "projects" */
export type Projects_Insert_Input = {
  created_at?: Maybe<Scalars['timestamptz']>;
  description?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['uuid']>;
  issues?: Maybe<Issues_Arr_Rel_Insert_Input>;
  owner_id?: Maybe<Scalars['String']>;
  project_members?: Maybe<Project_Members_Arr_Rel_Insert_Input>;
  project_owner?: Maybe<Users_Obj_Rel_Insert_Input>;
  title?: Maybe<Scalars['String']>;
  updated_at?: Maybe<Scalars['timestamptz']>;
  url?: Maybe<Scalars['String']>;
};

/** aggregate max on columns */
export type Projects_Max_Fields = {
  __typename?: 'projects_max_fields';
  created_at?: Maybe<Scalars['timestamptz']>;
  description?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['uuid']>;
  owner_id?: Maybe<Scalars['String']>;
  title?: Maybe<Scalars['String']>;
  updated_at?: Maybe<Scalars['timestamptz']>;
  url?: Maybe<Scalars['String']>;
};

/** order by max() on columns of table "projects" */
export type Projects_Max_Order_By = {
  created_at?: Maybe<Order_By>;
  description?: Maybe<Order_By>;
  id?: Maybe<Order_By>;
  owner_id?: Maybe<Order_By>;
  title?: Maybe<Order_By>;
  updated_at?: Maybe<Order_By>;
  url?: Maybe<Order_By>;
};

/** aggregate min on columns */
export type Projects_Min_Fields = {
  __typename?: 'projects_min_fields';
  created_at?: Maybe<Scalars['timestamptz']>;
  description?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['uuid']>;
  owner_id?: Maybe<Scalars['String']>;
  title?: Maybe<Scalars['String']>;
  updated_at?: Maybe<Scalars['timestamptz']>;
  url?: Maybe<Scalars['String']>;
};

/** order by min() on columns of table "projects" */
export type Projects_Min_Order_By = {
  created_at?: Maybe<Order_By>;
  description?: Maybe<Order_By>;
  id?: Maybe<Order_By>;
  owner_id?: Maybe<Order_By>;
  title?: Maybe<Order_By>;
  updated_at?: Maybe<Order_By>;
  url?: Maybe<Order_By>;
};

/** response of any mutation on the table "projects" */
export type Projects_Mutation_Response = {
  __typename?: 'projects_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int'];
  /** data from the rows affected by the mutation */
  returning: Array<Projects>;
};

/** input type for inserting object relation for remote table "projects" */
export type Projects_Obj_Rel_Insert_Input = {
  data: Projects_Insert_Input;
  /** on conflict condition */
  on_conflict?: Maybe<Projects_On_Conflict>;
};

/** on conflict condition type for table "projects" */
export type Projects_On_Conflict = {
  constraint: Projects_Constraint;
  update_columns?: Array<Projects_Update_Column>;
  where?: Maybe<Projects_Bool_Exp>;
};

/** Ordering options when selecting data from "projects". */
export type Projects_Order_By = {
  created_at?: Maybe<Order_By>;
  description?: Maybe<Order_By>;
  id?: Maybe<Order_By>;
  issues_aggregate?: Maybe<Issues_Aggregate_Order_By>;
  owner_id?: Maybe<Order_By>;
  project_members_aggregate?: Maybe<Project_Members_Aggregate_Order_By>;
  project_owner?: Maybe<Users_Order_By>;
  title?: Maybe<Order_By>;
  updated_at?: Maybe<Order_By>;
  url?: Maybe<Order_By>;
};

/** primary key columns input for table: projects */
export type Projects_Pk_Columns_Input = {
  id: Scalars['uuid'];
};

/** select columns of table "projects" */
export enum Projects_Select_Column {
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  Description = 'description',
  /** column name */
  Id = 'id',
  /** column name */
  OwnerId = 'owner_id',
  /** column name */
  Title = 'title',
  /** column name */
  UpdatedAt = 'updated_at',
  /** column name */
  Url = 'url'
}

/** input type for updating data in table "projects" */
export type Projects_Set_Input = {
  created_at?: Maybe<Scalars['timestamptz']>;
  description?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['uuid']>;
  owner_id?: Maybe<Scalars['String']>;
  title?: Maybe<Scalars['String']>;
  updated_at?: Maybe<Scalars['timestamptz']>;
  url?: Maybe<Scalars['String']>;
};

/** update columns of table "projects" */
export enum Projects_Update_Column {
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  Description = 'description',
  /** column name */
  Id = 'id',
  /** column name */
  OwnerId = 'owner_id',
  /** column name */
  Title = 'title',
  /** column name */
  UpdatedAt = 'updated_at',
  /** column name */
  Url = 'url'
}

export type Query_Root = {
  __typename?: 'query_root';
  /** An array relationship */
  comments: Array<Comments>;
  /** An aggregate relationship */
  comments_aggregate: Comments_Aggregate;
  /** fetch data from the table: "comments" using primary key columns */
  comments_by_pk?: Maybe<Comments>;
  /** An array relationship */
  issues: Array<Issues>;
  /** An aggregate relationship */
  issues_aggregate: Issues_Aggregate;
  /** fetch data from the table: "issues" using primary key columns */
  issues_by_pk?: Maybe<Issues>;
  /** fetch data from the table: "project_members" */
  project_members: Array<Project_Members>;
  /** An aggregate relationship */
  project_members_aggregate: Project_Members_Aggregate;
  /** fetch data from the table: "project_members" using primary key columns */
  project_members_by_pk?: Maybe<Project_Members>;
  /** An array relationship */
  projects: Array<Projects>;
  /** An aggregate relationship */
  projects_aggregate: Projects_Aggregate;
  /** fetch data from the table: "projects" using primary key columns */
  projects_by_pk?: Maybe<Projects>;
  /** execute function "search_users" which returns "users" */
  search_users: Array<Users>;
  /** execute function "search_users" and query aggregates on result of table type "users" */
  search_users_aggregate: Users_Aggregate;
  /** fetch data from the table: "user_private" */
  user_private: Array<User_Private>;
  /** fetch aggregated fields from the table: "user_private" */
  user_private_aggregate: User_Private_Aggregate;
  /** fetch data from the table: "user_type" */
  user_type: Array<User_Type>;
  /** fetch aggregated fields from the table: "user_type" */
  user_type_aggregate: User_Type_Aggregate;
  /** fetch data from the table: "user_type" using primary key columns */
  user_type_by_pk?: Maybe<User_Type>;
  /** fetch data from the table: "users" */
  users: Array<Users>;
  /** fetch aggregated fields from the table: "users" */
  users_aggregate: Users_Aggregate;
  /** fetch data from the table: "users" using primary key columns */
  users_by_pk?: Maybe<Users>;
};


export type Query_RootCommentsArgs = {
  distinct_on?: Maybe<Array<Comments_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Comments_Order_By>>;
  where?: Maybe<Comments_Bool_Exp>;
};


export type Query_RootComments_AggregateArgs = {
  distinct_on?: Maybe<Array<Comments_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Comments_Order_By>>;
  where?: Maybe<Comments_Bool_Exp>;
};


export type Query_RootComments_By_PkArgs = {
  id: Scalars['uuid'];
};


export type Query_RootIssuesArgs = {
  distinct_on?: Maybe<Array<Issues_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Issues_Order_By>>;
  where?: Maybe<Issues_Bool_Exp>;
};


export type Query_RootIssues_AggregateArgs = {
  distinct_on?: Maybe<Array<Issues_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Issues_Order_By>>;
  where?: Maybe<Issues_Bool_Exp>;
};


export type Query_RootIssues_By_PkArgs = {
  id: Scalars['uuid'];
};


export type Query_RootProject_MembersArgs = {
  distinct_on?: Maybe<Array<Project_Members_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Project_Members_Order_By>>;
  where?: Maybe<Project_Members_Bool_Exp>;
};


export type Query_RootProject_Members_AggregateArgs = {
  distinct_on?: Maybe<Array<Project_Members_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Project_Members_Order_By>>;
  where?: Maybe<Project_Members_Bool_Exp>;
};


export type Query_RootProject_Members_By_PkArgs = {
  id: Scalars['uuid'];
};


export type Query_RootProjectsArgs = {
  distinct_on?: Maybe<Array<Projects_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Projects_Order_By>>;
  where?: Maybe<Projects_Bool_Exp>;
};


export type Query_RootProjects_AggregateArgs = {
  distinct_on?: Maybe<Array<Projects_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Projects_Order_By>>;
  where?: Maybe<Projects_Bool_Exp>;
};


export type Query_RootProjects_By_PkArgs = {
  id: Scalars['uuid'];
};


export type Query_RootSearch_UsersArgs = {
  args: Search_Users_Args;
  distinct_on?: Maybe<Array<Users_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Users_Order_By>>;
  where?: Maybe<Users_Bool_Exp>;
};


export type Query_RootSearch_Users_AggregateArgs = {
  args: Search_Users_Args;
  distinct_on?: Maybe<Array<Users_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Users_Order_By>>;
  where?: Maybe<Users_Bool_Exp>;
};


export type Query_RootUser_PrivateArgs = {
  distinct_on?: Maybe<Array<User_Private_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<User_Private_Order_By>>;
  where?: Maybe<User_Private_Bool_Exp>;
};


export type Query_RootUser_Private_AggregateArgs = {
  distinct_on?: Maybe<Array<User_Private_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<User_Private_Order_By>>;
  where?: Maybe<User_Private_Bool_Exp>;
};


export type Query_RootUser_TypeArgs = {
  distinct_on?: Maybe<Array<User_Type_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<User_Type_Order_By>>;
  where?: Maybe<User_Type_Bool_Exp>;
};


export type Query_RootUser_Type_AggregateArgs = {
  distinct_on?: Maybe<Array<User_Type_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<User_Type_Order_By>>;
  where?: Maybe<User_Type_Bool_Exp>;
};


export type Query_RootUser_Type_By_PkArgs = {
  id: Scalars['uuid'];
};


export type Query_RootUsersArgs = {
  distinct_on?: Maybe<Array<Users_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Users_Order_By>>;
  where?: Maybe<Users_Bool_Exp>;
};


export type Query_RootUsers_AggregateArgs = {
  distinct_on?: Maybe<Array<Users_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Users_Order_By>>;
  where?: Maybe<Users_Bool_Exp>;
};


export type Query_RootUsers_By_PkArgs = {
  id: Scalars['String'];
};

export type Search_Users_Args = {
  useremail?: Maybe<Scalars['String']>;
};

export type Subscription_Root = {
  __typename?: 'subscription_root';
  /** An array relationship */
  comments: Array<Comments>;
  /** An aggregate relationship */
  comments_aggregate: Comments_Aggregate;
  /** fetch data from the table: "comments" using primary key columns */
  comments_by_pk?: Maybe<Comments>;
  /** An array relationship */
  issues: Array<Issues>;
  /** An aggregate relationship */
  issues_aggregate: Issues_Aggregate;
  /** fetch data from the table: "issues" using primary key columns */
  issues_by_pk?: Maybe<Issues>;
  /** fetch data from the table: "project_members" */
  project_members: Array<Project_Members>;
  /** An aggregate relationship */
  project_members_aggregate: Project_Members_Aggregate;
  /** fetch data from the table: "project_members" using primary key columns */
  project_members_by_pk?: Maybe<Project_Members>;
  /** An array relationship */
  projects: Array<Projects>;
  /** An aggregate relationship */
  projects_aggregate: Projects_Aggregate;
  /** fetch data from the table: "projects" using primary key columns */
  projects_by_pk?: Maybe<Projects>;
  /** execute function "search_users" which returns "users" */
  search_users: Array<Users>;
  /** execute function "search_users" and query aggregates on result of table type "users" */
  search_users_aggregate: Users_Aggregate;
  /** fetch data from the table: "user_private" */
  user_private: Array<User_Private>;
  /** fetch aggregated fields from the table: "user_private" */
  user_private_aggregate: User_Private_Aggregate;
  /** fetch data from the table: "user_type" */
  user_type: Array<User_Type>;
  /** fetch aggregated fields from the table: "user_type" */
  user_type_aggregate: User_Type_Aggregate;
  /** fetch data from the table: "user_type" using primary key columns */
  user_type_by_pk?: Maybe<User_Type>;
  /** fetch data from the table: "users" */
  users: Array<Users>;
  /** fetch aggregated fields from the table: "users" */
  users_aggregate: Users_Aggregate;
  /** fetch data from the table: "users" using primary key columns */
  users_by_pk?: Maybe<Users>;
};


export type Subscription_RootCommentsArgs = {
  distinct_on?: Maybe<Array<Comments_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Comments_Order_By>>;
  where?: Maybe<Comments_Bool_Exp>;
};


export type Subscription_RootComments_AggregateArgs = {
  distinct_on?: Maybe<Array<Comments_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Comments_Order_By>>;
  where?: Maybe<Comments_Bool_Exp>;
};


export type Subscription_RootComments_By_PkArgs = {
  id: Scalars['uuid'];
};


export type Subscription_RootIssuesArgs = {
  distinct_on?: Maybe<Array<Issues_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Issues_Order_By>>;
  where?: Maybe<Issues_Bool_Exp>;
};


export type Subscription_RootIssues_AggregateArgs = {
  distinct_on?: Maybe<Array<Issues_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Issues_Order_By>>;
  where?: Maybe<Issues_Bool_Exp>;
};


export type Subscription_RootIssues_By_PkArgs = {
  id: Scalars['uuid'];
};


export type Subscription_RootProject_MembersArgs = {
  distinct_on?: Maybe<Array<Project_Members_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Project_Members_Order_By>>;
  where?: Maybe<Project_Members_Bool_Exp>;
};


export type Subscription_RootProject_Members_AggregateArgs = {
  distinct_on?: Maybe<Array<Project_Members_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Project_Members_Order_By>>;
  where?: Maybe<Project_Members_Bool_Exp>;
};


export type Subscription_RootProject_Members_By_PkArgs = {
  id: Scalars['uuid'];
};


export type Subscription_RootProjectsArgs = {
  distinct_on?: Maybe<Array<Projects_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Projects_Order_By>>;
  where?: Maybe<Projects_Bool_Exp>;
};


export type Subscription_RootProjects_AggregateArgs = {
  distinct_on?: Maybe<Array<Projects_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Projects_Order_By>>;
  where?: Maybe<Projects_Bool_Exp>;
};


export type Subscription_RootProjects_By_PkArgs = {
  id: Scalars['uuid'];
};


export type Subscription_RootSearch_UsersArgs = {
  args: Search_Users_Args;
  distinct_on?: Maybe<Array<Users_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Users_Order_By>>;
  where?: Maybe<Users_Bool_Exp>;
};


export type Subscription_RootSearch_Users_AggregateArgs = {
  args: Search_Users_Args;
  distinct_on?: Maybe<Array<Users_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Users_Order_By>>;
  where?: Maybe<Users_Bool_Exp>;
};


export type Subscription_RootUser_PrivateArgs = {
  distinct_on?: Maybe<Array<User_Private_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<User_Private_Order_By>>;
  where?: Maybe<User_Private_Bool_Exp>;
};


export type Subscription_RootUser_Private_AggregateArgs = {
  distinct_on?: Maybe<Array<User_Private_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<User_Private_Order_By>>;
  where?: Maybe<User_Private_Bool_Exp>;
};


export type Subscription_RootUser_TypeArgs = {
  distinct_on?: Maybe<Array<User_Type_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<User_Type_Order_By>>;
  where?: Maybe<User_Type_Bool_Exp>;
};


export type Subscription_RootUser_Type_AggregateArgs = {
  distinct_on?: Maybe<Array<User_Type_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<User_Type_Order_By>>;
  where?: Maybe<User_Type_Bool_Exp>;
};


export type Subscription_RootUser_Type_By_PkArgs = {
  id: Scalars['uuid'];
};


export type Subscription_RootUsersArgs = {
  distinct_on?: Maybe<Array<Users_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Users_Order_By>>;
  where?: Maybe<Users_Bool_Exp>;
};


export type Subscription_RootUsers_AggregateArgs = {
  distinct_on?: Maybe<Array<Users_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Users_Order_By>>;
  where?: Maybe<Users_Bool_Exp>;
};


export type Subscription_RootUsers_By_PkArgs = {
  id: Scalars['String'];
};


/** Boolean expression to compare columns of type "timestamptz". All fields are combined with logical 'AND'. */
export type Timestamptz_Comparison_Exp = {
  _eq?: Maybe<Scalars['timestamptz']>;
  _gt?: Maybe<Scalars['timestamptz']>;
  _gte?: Maybe<Scalars['timestamptz']>;
  _in?: Maybe<Array<Scalars['timestamptz']>>;
  _is_null?: Maybe<Scalars['Boolean']>;
  _lt?: Maybe<Scalars['timestamptz']>;
  _lte?: Maybe<Scalars['timestamptz']>;
  _neq?: Maybe<Scalars['timestamptz']>;
  _nin?: Maybe<Array<Scalars['timestamptz']>>;
};

/** columns and relationships of "user_private" */
export type User_Private = {
  __typename?: 'user_private';
  email?: Maybe<Scalars['String']>;
  user_id?: Maybe<Scalars['String']>;
};

/** aggregated selection of "user_private" */
export type User_Private_Aggregate = {
  __typename?: 'user_private_aggregate';
  aggregate?: Maybe<User_Private_Aggregate_Fields>;
  nodes: Array<User_Private>;
};

/** aggregate fields of "user_private" */
export type User_Private_Aggregate_Fields = {
  __typename?: 'user_private_aggregate_fields';
  count: Scalars['Int'];
  max?: Maybe<User_Private_Max_Fields>;
  min?: Maybe<User_Private_Min_Fields>;
};


/** aggregate fields of "user_private" */
export type User_Private_Aggregate_FieldsCountArgs = {
  columns?: Maybe<Array<User_Private_Select_Column>>;
  distinct?: Maybe<Scalars['Boolean']>;
};

/** Boolean expression to filter rows from the table "user_private". All fields are combined with a logical 'AND'. */
export type User_Private_Bool_Exp = {
  _and?: Maybe<Array<User_Private_Bool_Exp>>;
  _not?: Maybe<User_Private_Bool_Exp>;
  _or?: Maybe<Array<User_Private_Bool_Exp>>;
  email?: Maybe<String_Comparison_Exp>;
  user_id?: Maybe<String_Comparison_Exp>;
};

/** input type for inserting data into table "user_private" */
export type User_Private_Insert_Input = {
  email?: Maybe<Scalars['String']>;
  user_id?: Maybe<Scalars['String']>;
};

/** aggregate max on columns */
export type User_Private_Max_Fields = {
  __typename?: 'user_private_max_fields';
  email?: Maybe<Scalars['String']>;
  user_id?: Maybe<Scalars['String']>;
};

/** aggregate min on columns */
export type User_Private_Min_Fields = {
  __typename?: 'user_private_min_fields';
  email?: Maybe<Scalars['String']>;
  user_id?: Maybe<Scalars['String']>;
};

/** response of any mutation on the table "user_private" */
export type User_Private_Mutation_Response = {
  __typename?: 'user_private_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int'];
  /** data from the rows affected by the mutation */
  returning: Array<User_Private>;
};

/** Ordering options when selecting data from "user_private". */
export type User_Private_Order_By = {
  email?: Maybe<Order_By>;
  user_id?: Maybe<Order_By>;
};

/** select columns of table "user_private" */
export enum User_Private_Select_Column {
  /** column name */
  Email = 'email',
  /** column name */
  UserId = 'user_id'
}

/** input type for updating data in table "user_private" */
export type User_Private_Set_Input = {
  email?: Maybe<Scalars['String']>;
  user_id?: Maybe<Scalars['String']>;
};

/** columns and relationships of "user_type" */
export type User_Type = {
  __typename?: 'user_type';
  id: Scalars['uuid'];
  type: Scalars['String'];
};

/** aggregated selection of "user_type" */
export type User_Type_Aggregate = {
  __typename?: 'user_type_aggregate';
  aggregate?: Maybe<User_Type_Aggregate_Fields>;
  nodes: Array<User_Type>;
};

/** aggregate fields of "user_type" */
export type User_Type_Aggregate_Fields = {
  __typename?: 'user_type_aggregate_fields';
  count: Scalars['Int'];
  max?: Maybe<User_Type_Max_Fields>;
  min?: Maybe<User_Type_Min_Fields>;
};


/** aggregate fields of "user_type" */
export type User_Type_Aggregate_FieldsCountArgs = {
  columns?: Maybe<Array<User_Type_Select_Column>>;
  distinct?: Maybe<Scalars['Boolean']>;
};

/** Boolean expression to filter rows from the table "user_type". All fields are combined with a logical 'AND'. */
export type User_Type_Bool_Exp = {
  _and?: Maybe<Array<User_Type_Bool_Exp>>;
  _not?: Maybe<User_Type_Bool_Exp>;
  _or?: Maybe<Array<User_Type_Bool_Exp>>;
  id?: Maybe<Uuid_Comparison_Exp>;
  type?: Maybe<String_Comparison_Exp>;
};

/** unique or primary key constraints on table "user_type" */
export enum User_Type_Constraint {
  /** unique or primary key constraint */
  ProjectUserTypePkey = 'project_user_type_pkey'
}

/** input type for inserting data into table "user_type" */
export type User_Type_Insert_Input = {
  id?: Maybe<Scalars['uuid']>;
  type?: Maybe<Scalars['String']>;
};

/** aggregate max on columns */
export type User_Type_Max_Fields = {
  __typename?: 'user_type_max_fields';
  id?: Maybe<Scalars['uuid']>;
  type?: Maybe<Scalars['String']>;
};

/** aggregate min on columns */
export type User_Type_Min_Fields = {
  __typename?: 'user_type_min_fields';
  id?: Maybe<Scalars['uuid']>;
  type?: Maybe<Scalars['String']>;
};

/** response of any mutation on the table "user_type" */
export type User_Type_Mutation_Response = {
  __typename?: 'user_type_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int'];
  /** data from the rows affected by the mutation */
  returning: Array<User_Type>;
};

/** on conflict condition type for table "user_type" */
export type User_Type_On_Conflict = {
  constraint: User_Type_Constraint;
  update_columns?: Array<User_Type_Update_Column>;
  where?: Maybe<User_Type_Bool_Exp>;
};

/** Ordering options when selecting data from "user_type". */
export type User_Type_Order_By = {
  id?: Maybe<Order_By>;
  type?: Maybe<Order_By>;
};

/** primary key columns input for table: user_type */
export type User_Type_Pk_Columns_Input = {
  id: Scalars['uuid'];
};

/** select columns of table "user_type" */
export enum User_Type_Select_Column {
  /** column name */
  Id = 'id',
  /** column name */
  Type = 'type'
}

/** input type for updating data in table "user_type" */
export type User_Type_Set_Input = {
  id?: Maybe<Scalars['uuid']>;
  type?: Maybe<Scalars['String']>;
};

/** update columns of table "user_type" */
export enum User_Type_Update_Column {
  /** column name */
  Id = 'id',
  /** column name */
  Type = 'type'
}

/** columns and relationships of "users" */
export type Users = {
  __typename?: 'users';
  /** An array relationship */
  comments: Array<Comments>;
  /** An aggregate relationship */
  comments_aggregate: Comments_Aggregate;
  email: Scalars['String'];
  first_name?: Maybe<Scalars['String']>;
  id: Scalars['String'];
  /** An array relationship */
  issues: Array<Issues>;
  /** An aggregate relationship */
  issues_aggregate: Issues_Aggregate;
  last_name?: Maybe<Scalars['String']>;
  manager_id?: Maybe<Scalars['String']>;
  /** fetch data from the table: "project_members" */
  project_members: Array<Project_Members>;
  /** An aggregate relationship */
  project_members_aggregate: Project_Members_Aggregate;
  /** An array relationship */
  projects: Array<Projects>;
  /** An aggregate relationship */
  projects_aggregate: Projects_Aggregate;
};


/** columns and relationships of "users" */
export type UsersCommentsArgs = {
  distinct_on?: Maybe<Array<Comments_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Comments_Order_By>>;
  where?: Maybe<Comments_Bool_Exp>;
};


/** columns and relationships of "users" */
export type UsersComments_AggregateArgs = {
  distinct_on?: Maybe<Array<Comments_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Comments_Order_By>>;
  where?: Maybe<Comments_Bool_Exp>;
};


/** columns and relationships of "users" */
export type UsersIssuesArgs = {
  distinct_on?: Maybe<Array<Issues_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Issues_Order_By>>;
  where?: Maybe<Issues_Bool_Exp>;
};


/** columns and relationships of "users" */
export type UsersIssues_AggregateArgs = {
  distinct_on?: Maybe<Array<Issues_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Issues_Order_By>>;
  where?: Maybe<Issues_Bool_Exp>;
};


/** columns and relationships of "users" */
export type UsersProject_MembersArgs = {
  distinct_on?: Maybe<Array<Project_Members_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Project_Members_Order_By>>;
  where?: Maybe<Project_Members_Bool_Exp>;
};


/** columns and relationships of "users" */
export type UsersProject_Members_AggregateArgs = {
  distinct_on?: Maybe<Array<Project_Members_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Project_Members_Order_By>>;
  where?: Maybe<Project_Members_Bool_Exp>;
};


/** columns and relationships of "users" */
export type UsersProjectsArgs = {
  distinct_on?: Maybe<Array<Projects_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Projects_Order_By>>;
  where?: Maybe<Projects_Bool_Exp>;
};


/** columns and relationships of "users" */
export type UsersProjects_AggregateArgs = {
  distinct_on?: Maybe<Array<Projects_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Projects_Order_By>>;
  where?: Maybe<Projects_Bool_Exp>;
};

/** aggregated selection of "users" */
export type Users_Aggregate = {
  __typename?: 'users_aggregate';
  aggregate?: Maybe<Users_Aggregate_Fields>;
  nodes: Array<Users>;
};

/** aggregate fields of "users" */
export type Users_Aggregate_Fields = {
  __typename?: 'users_aggregate_fields';
  count: Scalars['Int'];
  max?: Maybe<Users_Max_Fields>;
  min?: Maybe<Users_Min_Fields>;
};


/** aggregate fields of "users" */
export type Users_Aggregate_FieldsCountArgs = {
  columns?: Maybe<Array<Users_Select_Column>>;
  distinct?: Maybe<Scalars['Boolean']>;
};

/** Boolean expression to filter rows from the table "users". All fields are combined with a logical 'AND'. */
export type Users_Bool_Exp = {
  _and?: Maybe<Array<Users_Bool_Exp>>;
  _not?: Maybe<Users_Bool_Exp>;
  _or?: Maybe<Array<Users_Bool_Exp>>;
  comments?: Maybe<Comments_Bool_Exp>;
  email?: Maybe<String_Comparison_Exp>;
  first_name?: Maybe<String_Comparison_Exp>;
  id?: Maybe<String_Comparison_Exp>;
  issues?: Maybe<Issues_Bool_Exp>;
  last_name?: Maybe<String_Comparison_Exp>;
  manager_id?: Maybe<String_Comparison_Exp>;
  project_members?: Maybe<Project_Members_Bool_Exp>;
  projects?: Maybe<Projects_Bool_Exp>;
};

/** unique or primary key constraints on table "users" */
export enum Users_Constraint {
  /** unique or primary key constraint */
  UsersPkey = 'users_pkey'
}

/** input type for inserting data into table "users" */
export type Users_Insert_Input = {
  comments?: Maybe<Comments_Arr_Rel_Insert_Input>;
  email?: Maybe<Scalars['String']>;
  first_name?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['String']>;
  issues?: Maybe<Issues_Arr_Rel_Insert_Input>;
  last_name?: Maybe<Scalars['String']>;
  manager_id?: Maybe<Scalars['String']>;
  project_members?: Maybe<Project_Members_Arr_Rel_Insert_Input>;
  projects?: Maybe<Projects_Arr_Rel_Insert_Input>;
};

/** aggregate max on columns */
export type Users_Max_Fields = {
  __typename?: 'users_max_fields';
  email?: Maybe<Scalars['String']>;
  first_name?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['String']>;
  last_name?: Maybe<Scalars['String']>;
  manager_id?: Maybe<Scalars['String']>;
};

/** aggregate min on columns */
export type Users_Min_Fields = {
  __typename?: 'users_min_fields';
  email?: Maybe<Scalars['String']>;
  first_name?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['String']>;
  last_name?: Maybe<Scalars['String']>;
  manager_id?: Maybe<Scalars['String']>;
};

/** response of any mutation on the table "users" */
export type Users_Mutation_Response = {
  __typename?: 'users_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int'];
  /** data from the rows affected by the mutation */
  returning: Array<Users>;
};

/** input type for inserting object relation for remote table "users" */
export type Users_Obj_Rel_Insert_Input = {
  data: Users_Insert_Input;
  /** on conflict condition */
  on_conflict?: Maybe<Users_On_Conflict>;
};

/** on conflict condition type for table "users" */
export type Users_On_Conflict = {
  constraint: Users_Constraint;
  update_columns?: Array<Users_Update_Column>;
  where?: Maybe<Users_Bool_Exp>;
};

/** Ordering options when selecting data from "users". */
export type Users_Order_By = {
  comments_aggregate?: Maybe<Comments_Aggregate_Order_By>;
  email?: Maybe<Order_By>;
  first_name?: Maybe<Order_By>;
  id?: Maybe<Order_By>;
  issues_aggregate?: Maybe<Issues_Aggregate_Order_By>;
  last_name?: Maybe<Order_By>;
  manager_id?: Maybe<Order_By>;
  project_members_aggregate?: Maybe<Project_Members_Aggregate_Order_By>;
  projects_aggregate?: Maybe<Projects_Aggregate_Order_By>;
};

/** primary key columns input for table: users */
export type Users_Pk_Columns_Input = {
  id: Scalars['String'];
};

/** select columns of table "users" */
export enum Users_Select_Column {
  /** column name */
  Email = 'email',
  /** column name */
  FirstName = 'first_name',
  /** column name */
  Id = 'id',
  /** column name */
  LastName = 'last_name',
  /** column name */
  ManagerId = 'manager_id'
}

/** input type for updating data in table "users" */
export type Users_Set_Input = {
  email?: Maybe<Scalars['String']>;
  first_name?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['String']>;
  last_name?: Maybe<Scalars['String']>;
  manager_id?: Maybe<Scalars['String']>;
};

/** update columns of table "users" */
export enum Users_Update_Column {
  /** column name */
  Email = 'email',
  /** column name */
  FirstName = 'first_name',
  /** column name */
  Id = 'id',
  /** column name */
  LastName = 'last_name',
  /** column name */
  ManagerId = 'manager_id'
}


/** Boolean expression to compare columns of type "uuid". All fields are combined with logical 'AND'. */
export type Uuid_Comparison_Exp = {
  _eq?: Maybe<Scalars['uuid']>;
  _gt?: Maybe<Scalars['uuid']>;
  _gte?: Maybe<Scalars['uuid']>;
  _in?: Maybe<Array<Scalars['uuid']>>;
  _is_null?: Maybe<Scalars['Boolean']>;
  _lt?: Maybe<Scalars['uuid']>;
  _lte?: Maybe<Scalars['uuid']>;
  _neq?: Maybe<Scalars['uuid']>;
  _nin?: Maybe<Array<Scalars['uuid']>>;
};

export type AddUserToProjectMutationVariables = Exact<{
  userId: Scalars['String'];
  projectId: Scalars['uuid'];
  typeId: Scalars['uuid'];
}>;


export type AddUserToProjectMutation = (
  { __typename?: 'mutation_root' }
  & { insert_project_members_one?: Maybe<(
    { __typename?: 'project_members' }
    & Pick<Project_Members, 'id'>
    & { user?: Maybe<(
      { __typename?: 'users' }
      & Pick<Users, 'email'>
    )> }
  )> }
);

export type CreateProjectMutationVariables = Exact<{
  title: Scalars['String'];
  description?: Maybe<Scalars['String']>;
}>;


export type CreateProjectMutation = (
  { __typename?: 'mutation_root' }
  & { insert_projects_one?: Maybe<(
    { __typename?: 'projects' }
    & Pick<Projects, 'id' | 'title' | 'description'>
  )> }
);

export type DeleteProjectMutationVariables = Exact<{
  id: Scalars['uuid'];
}>;


export type DeleteProjectMutation = (
  { __typename?: 'mutation_root' }
  & { delete_projects_by_pk?: Maybe<(
    { __typename?: 'projects' }
    & Pick<Projects, 'id' | 'title'>
  )> }
);

export type UpdateProjectMutationVariables = Exact<{
  id: Scalars['uuid'];
  title?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
}>;


export type UpdateProjectMutation = (
  { __typename?: 'mutation_root' }
  & { update_projects_by_pk?: Maybe<(
    { __typename?: 'projects' }
    & Pick<Projects, 'id' | 'description' | 'title'>
  )> }
);

export type GetProjectByIdQueryVariables = Exact<{
  id: Scalars['uuid'];
}>;


export type GetProjectByIdQuery = (
  { __typename?: 'query_root' }
  & { projects_by_pk?: Maybe<(
    { __typename?: 'projects' }
    & Pick<Projects, 'id' | 'title' | 'description'>
  )> }
);

export type GetProjectsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetProjectsQuery = (
  { __typename?: 'query_root' }
  & { projects: Array<(
    { __typename?: 'projects' }
    & Pick<Projects, 'id' | 'title' | 'description'>
    & { project_owner: (
      { __typename?: 'users' }
      & Pick<Users, 'email'>
    ) }
  )> }
);

export type GetUsersQueryVariables = Exact<{ [key: string]: never; }>;


export type GetUsersQuery = (
  { __typename?: 'query_root' }
  & { users: Array<(
    { __typename?: 'users' }
    & Pick<Users, 'email' | 'id'>
  )> }
);

export type SearchUsersByEmailQueryVariables = Exact<{
  email: Scalars['String'];
}>;


export type SearchUsersByEmailQuery = (
  { __typename?: 'query_root' }
  & { search_users: Array<(
    { __typename?: 'users' }
    & Pick<Users, 'email' | 'id'>
  )> }
);


export const AddUserToProjectDocument = gql`
    mutation AddUserToProject($userId: String!, $projectId: uuid!, $typeId: uuid!) {
  insert_project_members_one(
    object: {user_id: $userId, project_id: $projectId, type_id: $typeId}
  ) {
    id
    user {
      email
    }
  }
}
    `;
export type AddUserToProjectMutationFn = Apollo.MutationFunction<AddUserToProjectMutation, AddUserToProjectMutationVariables>;

/**
 * __useAddUserToProjectMutation__
 *
 * To run a mutation, you first call `useAddUserToProjectMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddUserToProjectMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addUserToProjectMutation, { data, loading, error }] = useAddUserToProjectMutation({
 *   variables: {
 *      userId: // value for 'userId'
 *      projectId: // value for 'projectId'
 *      typeId: // value for 'typeId'
 *   },
 * });
 */
export function useAddUserToProjectMutation(baseOptions?: Apollo.MutationHookOptions<AddUserToProjectMutation, AddUserToProjectMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AddUserToProjectMutation, AddUserToProjectMutationVariables>(AddUserToProjectDocument, options);
      }
export type AddUserToProjectMutationHookResult = ReturnType<typeof useAddUserToProjectMutation>;
export type AddUserToProjectMutationResult = Apollo.MutationResult<AddUserToProjectMutation>;
export type AddUserToProjectMutationOptions = Apollo.BaseMutationOptions<AddUserToProjectMutation, AddUserToProjectMutationVariables>;
export const CreateProjectDocument = gql`
    mutation CreateProject($title: String!, $description: String) {
  insert_projects_one(object: {title: $title, description: $description}) {
    id
    title
    description
  }
}
    `;
export type CreateProjectMutationFn = Apollo.MutationFunction<CreateProjectMutation, CreateProjectMutationVariables>;

/**
 * __useCreateProjectMutation__
 *
 * To run a mutation, you first call `useCreateProjectMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateProjectMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createProjectMutation, { data, loading, error }] = useCreateProjectMutation({
 *   variables: {
 *      title: // value for 'title'
 *      description: // value for 'description'
 *   },
 * });
 */
export function useCreateProjectMutation(baseOptions?: Apollo.MutationHookOptions<CreateProjectMutation, CreateProjectMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateProjectMutation, CreateProjectMutationVariables>(CreateProjectDocument, options);
      }
export type CreateProjectMutationHookResult = ReturnType<typeof useCreateProjectMutation>;
export type CreateProjectMutationResult = Apollo.MutationResult<CreateProjectMutation>;
export type CreateProjectMutationOptions = Apollo.BaseMutationOptions<CreateProjectMutation, CreateProjectMutationVariables>;
export const DeleteProjectDocument = gql`
    mutation DeleteProject($id: uuid!) {
  delete_projects_by_pk(id: $id) {
    id
    title
  }
}
    `;
export type DeleteProjectMutationFn = Apollo.MutationFunction<DeleteProjectMutation, DeleteProjectMutationVariables>;

/**
 * __useDeleteProjectMutation__
 *
 * To run a mutation, you first call `useDeleteProjectMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteProjectMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteProjectMutation, { data, loading, error }] = useDeleteProjectMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteProjectMutation(baseOptions?: Apollo.MutationHookOptions<DeleteProjectMutation, DeleteProjectMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteProjectMutation, DeleteProjectMutationVariables>(DeleteProjectDocument, options);
      }
export type DeleteProjectMutationHookResult = ReturnType<typeof useDeleteProjectMutation>;
export type DeleteProjectMutationResult = Apollo.MutationResult<DeleteProjectMutation>;
export type DeleteProjectMutationOptions = Apollo.BaseMutationOptions<DeleteProjectMutation, DeleteProjectMutationVariables>;
export const UpdateProjectDocument = gql`
    mutation UpdateProject($id: uuid!, $title: String, $description: String) {
  update_projects_by_pk(
    pk_columns: {id: $id}
    _set: {title: $title, description: $description}
  ) {
    id
    description
    title
  }
}
    `;
export type UpdateProjectMutationFn = Apollo.MutationFunction<UpdateProjectMutation, UpdateProjectMutationVariables>;

/**
 * __useUpdateProjectMutation__
 *
 * To run a mutation, you first call `useUpdateProjectMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateProjectMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateProjectMutation, { data, loading, error }] = useUpdateProjectMutation({
 *   variables: {
 *      id: // value for 'id'
 *      title: // value for 'title'
 *      description: // value for 'description'
 *   },
 * });
 */
export function useUpdateProjectMutation(baseOptions?: Apollo.MutationHookOptions<UpdateProjectMutation, UpdateProjectMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateProjectMutation, UpdateProjectMutationVariables>(UpdateProjectDocument, options);
      }
export type UpdateProjectMutationHookResult = ReturnType<typeof useUpdateProjectMutation>;
export type UpdateProjectMutationResult = Apollo.MutationResult<UpdateProjectMutation>;
export type UpdateProjectMutationOptions = Apollo.BaseMutationOptions<UpdateProjectMutation, UpdateProjectMutationVariables>;
export const GetProjectByIdDocument = gql`
    query GetProjectById($id: uuid!) {
  projects_by_pk(id: $id) {
    id
    title
    description
  }
}
    `;

/**
 * __useGetProjectByIdQuery__
 *
 * To run a query within a React component, call `useGetProjectByIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetProjectByIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetProjectByIdQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetProjectByIdQuery(baseOptions: Apollo.QueryHookOptions<GetProjectByIdQuery, GetProjectByIdQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetProjectByIdQuery, GetProjectByIdQueryVariables>(GetProjectByIdDocument, options);
      }
export function useGetProjectByIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetProjectByIdQuery, GetProjectByIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetProjectByIdQuery, GetProjectByIdQueryVariables>(GetProjectByIdDocument, options);
        }
export type GetProjectByIdQueryHookResult = ReturnType<typeof useGetProjectByIdQuery>;
export type GetProjectByIdLazyQueryHookResult = ReturnType<typeof useGetProjectByIdLazyQuery>;
export type GetProjectByIdQueryResult = Apollo.QueryResult<GetProjectByIdQuery, GetProjectByIdQueryVariables>;
export const GetProjectsDocument = gql`
    query GetProjects {
  projects {
    id
    title
    description
    project_owner {
      email
    }
  }
}
    `;

/**
 * __useGetProjectsQuery__
 *
 * To run a query within a React component, call `useGetProjectsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetProjectsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetProjectsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetProjectsQuery(baseOptions?: Apollo.QueryHookOptions<GetProjectsQuery, GetProjectsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetProjectsQuery, GetProjectsQueryVariables>(GetProjectsDocument, options);
      }
export function useGetProjectsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetProjectsQuery, GetProjectsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetProjectsQuery, GetProjectsQueryVariables>(GetProjectsDocument, options);
        }
export type GetProjectsQueryHookResult = ReturnType<typeof useGetProjectsQuery>;
export type GetProjectsLazyQueryHookResult = ReturnType<typeof useGetProjectsLazyQuery>;
export type GetProjectsQueryResult = Apollo.QueryResult<GetProjectsQuery, GetProjectsQueryVariables>;
export const GetUsersDocument = gql`
    query GetUsers {
  users {
    email
    id
  }
}
    `;

/**
 * __useGetUsersQuery__
 *
 * To run a query within a React component, call `useGetUsersQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUsersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUsersQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetUsersQuery(baseOptions?: Apollo.QueryHookOptions<GetUsersQuery, GetUsersQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetUsersQuery, GetUsersQueryVariables>(GetUsersDocument, options);
      }
export function useGetUsersLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetUsersQuery, GetUsersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetUsersQuery, GetUsersQueryVariables>(GetUsersDocument, options);
        }
export type GetUsersQueryHookResult = ReturnType<typeof useGetUsersQuery>;
export type GetUsersLazyQueryHookResult = ReturnType<typeof useGetUsersLazyQuery>;
export type GetUsersQueryResult = Apollo.QueryResult<GetUsersQuery, GetUsersQueryVariables>;
export const SearchUsersByEmailDocument = gql`
    query SearchUsersByEmail($email: String!) {
  search_users(args: {useremail: $email}) {
    email
    id
  }
}
    `;

/**
 * __useSearchUsersByEmailQuery__
 *
 * To run a query within a React component, call `useSearchUsersByEmailQuery` and pass it any options that fit your needs.
 * When your component renders, `useSearchUsersByEmailQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSearchUsersByEmailQuery({
 *   variables: {
 *      email: // value for 'email'
 *   },
 * });
 */
export function useSearchUsersByEmailQuery(baseOptions: Apollo.QueryHookOptions<SearchUsersByEmailQuery, SearchUsersByEmailQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<SearchUsersByEmailQuery, SearchUsersByEmailQueryVariables>(SearchUsersByEmailDocument, options);
      }
export function useSearchUsersByEmailLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<SearchUsersByEmailQuery, SearchUsersByEmailQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<SearchUsersByEmailQuery, SearchUsersByEmailQueryVariables>(SearchUsersByEmailDocument, options);
        }
export type SearchUsersByEmailQueryHookResult = ReturnType<typeof useSearchUsersByEmailQuery>;
export type SearchUsersByEmailLazyQueryHookResult = ReturnType<typeof useSearchUsersByEmailLazyQuery>;
export type SearchUsersByEmailQueryResult = Apollo.QueryResult<SearchUsersByEmailQuery, SearchUsersByEmailQueryVariables>;