namespace LyricOptions {
  export interface Data {
    meta: Meta;
    response: Response;
  }

  export interface Meta {
    status: number;
  }

  export interface Response {
    sections: Section[];
  }

  export interface Section {
    type: string;
    hits: Hit[];
  }

  export interface Hit {
    highlights: Highlight[];
    index: string;
    type: string;
    result: Result;
  }

  export interface Highlight {
    property: string;
    value: string;
    snippet: boolean;
    ranges: Range[];
  }

  export interface Range {
    start: number;
    end: number;
  }

  export interface Result {
    _type: string;
    api_path: string;
    header_image_url?: string;
    id: number;
    image_url?: string;
    index_character?: string;
    is_meme_verified?: boolean;
    is_verified?: boolean;
    name?: string;
    slug?: string;
    url: string;
    annotation_count?: number;
    artist_names?: string;
    full_title?: string;
    header_image_thumbnail_url?: string;
    instrumental?: boolean;
    language?: string;
    lyrics_owner_id?: number;
    lyrics_state?: string;
    lyrics_updated_at?: number;
    path?: string;
    pyongs_count?: number;
    relationships_index_url?: string;
    release_date_components?: ReleaseDateComponents;
    release_date_for_display?: string;
    release_date_with_abbreviated_month_for_display?: string;
    song_art_image_thumbnail_url?: string;
    song_art_image_url?: string;
    stats?: Stats;
    title?: string;
    title_with_featured?: string;
    updated_by_human_at?: number;
    featured_artists?: FeaturedArtist[];
    primary_artist?: PrimaryArtist;
    iq?: number;
    cover_art_thumbnail_url?: string;
    cover_art_url?: string;
    name_with_artist?: string;
    artist?: Artist;
    article_url?: string;
    author_list_for_display?: string;
    dek?: string;
    description?: string;
    dfp_kv?: DfpKv[];
    duration?: number;
    poster_attributes?: PosterAttributes;
    poster_url?: string;
    provider?: string;
    provider_id?: string;
    provider_params?: ProviderParam[];
    short_title?: string;
    type?: string;
    video_attributes?: VideoAttributes;
    current_user_metadata?: CurrentUserMetadata;
    published_at?: number;
    view_count?: number;
    author?: Author;
    sponsorship?: Sponsorship;
    article_type?: string;
    draft?: boolean;
    featured_slot: any;
    for_homepage?: boolean;
    for_mobile?: boolean;
    generic_sponsorship?: boolean;
    preview_image?: string;
    sponsor_image: any;
    sponsor_image_style?: string;
    sponsor_link?: string;
    sponsor_phrase?: string;
    sponsored?: boolean;
    votes_total?: number;
    about_me_summary?: string;
    avatar?: Avatar2;
    human_readable_role_for_display: any;
    login?: string;
    role_for_display: any;
  }

  export interface ReleaseDateComponents {
    year: number;
    month: number;
    day: number;
  }

  export interface Stats {
    unreviewed_annotations: number;
    hot: boolean;
    pageviews: number;
    concurrents?: number;
  }

  export interface FeaturedArtist {
    _type: string;
    api_path: string;
    header_image_url: string;
    id: number;
    image_url: string;
    index_character: string;
    is_meme_verified: boolean;
    is_verified: boolean;
    name: string;
    slug: string;
    url: string;
    iq?: number;
  }

  export interface PrimaryArtist {
    _type: string;
    api_path: string;
    header_image_url: string;
    id: number;
    image_url: string;
    index_character: string;
    is_meme_verified: boolean;
    is_verified: boolean;
    name: string;
    slug: string;
    url: string;
    iq?: number;
  }

  export interface Artist {
    _type: string;
    api_path: string;
    header_image_url: string;
    id: number;
    image_url: string;
    index_character: string;
    is_meme_verified: boolean;
    is_verified: boolean;
    name: string;
    slug: string;
    url: string;
    iq?: number;
  }

  export interface DfpKv {
    name: string;
    values: string[];
  }

  export interface PosterAttributes {
    height: number;
    width: number;
  }

  export interface ProviderParam {
    name: string;
    value: string;
  }

  export interface VideoAttributes {
    width: number;
    height: number;
  }

  export interface CurrentUserMetadata {
    permissions: any[];
    excluded_permissions: string[];
    interactions?: Interactions;
  }

  export interface Interactions {
    following: boolean;
  }

  export interface Author {
    _type: string;
    about_me_summary: string;
    api_path: string;
    avatar: Avatar;
    header_image_url: string;
    human_readable_role_for_display: string;
    id: number;
    iq: number;
    is_meme_verified: boolean;
    is_verified: boolean;
    login: string;
    name: string;
    role_for_display: string;
    url: string;
    current_user_metadata: CurrentUserMetadata2;
  }

  export interface Avatar {
    tiny: Tiny;
    thumb: Thumb;
    small: Small;
    medium: Medium;
  }

  export interface Tiny {
    url: string;
    bounding_box: BoundingBox;
  }

  export interface BoundingBox {
    width: number;
    height: number;
  }

  export interface Thumb {
    url: string;
    bounding_box: BoundingBox2;
  }

  export interface BoundingBox2 {
    width: number;
    height: number;
  }

  export interface Small {
    url: string;
    bounding_box: BoundingBox3;
  }

  export interface BoundingBox3 {
    width: number;
    height: number;
  }

  export interface Medium {
    url: string;
    bounding_box: BoundingBox4;
  }

  export interface BoundingBox4 {
    width: number;
    height: number;
  }

  export interface CurrentUserMetadata2 {
    permissions: any[];
    excluded_permissions: string[];
    interactions: Interactions2;
  }

  export interface Interactions2 {
    following: boolean;
  }

  export interface Sponsorship {
    _type: string;
    api_path: string;
    sponsor_image: any;
    sponsor_image_style: string;
    sponsor_link: string;
    sponsor_phrase: string;
    sponsored: boolean;
  }

  export interface Avatar2 {
    tiny: Tiny2;
    thumb: Thumb2;
    small: Small2;
    medium: Medium2;
  }

  export interface Tiny2 {
    url: string;
    bounding_box: BoundingBox5;
  }

  export interface BoundingBox5 {
    width: number;
    height: number;
  }

  export interface Thumb2 {
    url: string;
    bounding_box: BoundingBox6;
  }

  export interface BoundingBox6 {
    width: number;
    height: number;
  }

  export interface Small2 {
    url: string;
    bounding_box: BoundingBox7;
  }

  export interface BoundingBox7 {
    width: number;
    height: number;
  }

  export interface Medium2 {
    url: string;
    bounding_box: BoundingBox8;
  }

  export interface BoundingBox8 {
    width: number;
    height: number;
  }
}
