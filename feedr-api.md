# Feedr API

## Login Resource

### *POST /login*

#### Request Body

```json
{
  "username": "jacob"
}
```

#### Response Body

```json
{
  "userId": 21
}
```

---

## Interests Resource

### *GET /interests*

#### Parameters

*userId* (Number) - the id for the personalized feed

#### Response Body

```json
[
  "science",
  "politics",
  "crime"
]
```

--

### *POST /interests/:interest*

#### Path

*:interest* (String) - An interest string (i.e. science).

#### Parameters

*userId* (Number) - the id for the interest.

#### Response Body

```json
[
  "science",
  "politics"
]
```

--

### *PUT /interests*

#### Parameters

*userId* (Number) - the id for the interest.

#### Request Body

```json
[
  "science",
  "politics",
  "crime"
]
```

#### Response Body

```json
[
  "science",
  "politics",
  "crime"
]
```

--

### *DELETE /interests/:interest*

#### Path

*:interest* (String) - An interest string to be removed (i.e. science).

#### Parameters

*userId* (Number) - the id for the interest.

#### Response Body

```json
[
  "politics"
]
```

---

## Categories Resource

### *GET /categories*

### Parameters

*userId* (Number) - the user id for the categories

### Response Body

```json
[
  {
    "name":"entertainment",
    "selected":false
  },
  {
    "name":"lifestyle",
    "selected":true
  },
  {
    "name":"world",
    "selected":true
  }
]
```

---

## Feed Resource

### *GET /feed*

#### Parameters

*userId* (Number) - the user id for the personalized feed

#### Response Body

```json
[
  {
    "id": -595284414,
    "title": "My Article",
    "url": "http://example.com",
    "imageUrl": "http://example.com/feature.png",
    "description": "This is an article about the world",
    "category": "science",
    "date": "2016-07-21T11:08:24.000Z",
    "source": "Mashable",
    "bookmarked": false
  }
]
```

---

## Bookmarks Resource

### *GET /bookmarks*

#### Parameters

*userId* (Number) - the id for the bookmark

#### Response Body

```json
[
  -595284414,
  8782376173
]
```

--

### *POST /bookmarks/:id*

#### Path

*:id* (Number) - the article id to bookmark

#### Parameters

*userId* (Number) - the id for the bookmark

#### Response Body

```json
[
  -595284414,
  8782376173
]
```

--

### *PUT /bookmarks*

#### Parameters

*userId* (Number) - the id for the bookmark

#### Request Body

```json
[
  -595284414,
  8782376173
]
```

#### Response Body

```json
[
  -595284414,
  8782376173
]
```

--

### *DELETE /bookmarks/:id*

#### Path

*:url* (Number) - the article id to un-bookmark

#### Parameters

*userId* (Number) - the id for the bookmark

#### Response Body

```json
[
  -595284414
]
```
