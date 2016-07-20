# Feedr API

## POST /login

### Request Body

```json
{
  "username": "jacob"
}
```

### Response Body

```json
{
  "id": 21
}
```

--

## GET /interests

### Parameters

*userId* (Number) - the id for the personalized feed

### Response Body

```json
[
  "science",
  "politics",
  "crime"
]
```

--

## POST /interests/:interest

### Path

*:interest* (String) - An interest string (i.e. science).

### Parameters

*userId* (Number) - the id for the interest.

### Response Body

```json
[
  "science",
  "politics"
]
```

--

## PUT /interests

### Parameters

*userId* (Number) - the id for the interest.

### Request Body

```json
[
  "science",
  "politics",
  "crime"
]
```

### Response Body

```json
[
  "science",
  "politics",
  "crime"
]
```

--

## GET /feed

### Parameters

*userId* (Number) - the id for the personalized feed

### Response Body

```json
[
  {
    "title": "My Article",
    "url": "http://example.com",
    "imageUrl": "http://example.com/feature.png",
    "description": "This is an article about the world",
    "bookmarked": false
  }
]
```

--

## GET /bookmarks

### Parameters

*userId* (Number) - the id for the bookmark

### Response Body

```json
[
  {
    "title": "My Article",
    "url": "http://example.com",
    "imageUrl": "http://example.com/feature.png",
    "description": "This is an article about the world",
    "bookmarked": true
  }
]
```

--

## POST /bookmarks/:url

### Path

*:url* (String) - the url that the user wants to bookmark

### Parameters

*userId* (Number) - the id for the bookmark

### Response Body

```json
[
  {
    "title": "My Article",
    "url": "http://example.com",
    "imageUrl": "http://example.com/feature.png",
    "description": "This is an article about the world",
    "bookmarked": true
  }
]
```

--

## DELETE /bookmarks/:url

### Path

*:url* (String) - the url of the bookmark that the user wants to delete

### Parameters

*userId* (Number) - the id for the bookmark

### Response Body

```json
[
  {
    "title": "My Article",
    "url": "http://example.com",
    "imageUrl": "http://example.com/feature.png",
    "description": "This is an article about the world",
    "bookmarked": true
  }
]
```
