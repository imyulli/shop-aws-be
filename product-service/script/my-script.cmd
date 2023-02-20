aws dynamodb put-item --table-name Products --item {\"id\":{\"S\":\"7567ec4b-b10c-48c5-9345-fc73c48a80aa\"},\"title\":{\"S\":\"Ficus\"},\"description\":{\"S\":\"Ficus" "is" "a" "genus" "of" "about" "850" "species" "of" "woody" "trees" "shrubs" "vines" "epiphytes" "and" "hemiepiphytes" "in" "the" "family" "Moraceae\"},\"price\":{\"N\":\"10\"}}
aws dynamodb put-item --table-name Products --item {\"id\":{\"S\":\"7567ec4b-b10c-48c5-9345-fc73c48a80a0\"},\"title\":{\"S\":\"Calathea\"},\"description\":{\"S\":\"Calathea" "is" "a" "genus" "of" "flowering" "plants" "belonging" "to" "the" "family" "Marantaceae\"},\"price\":{\"N\":\"16\"}}
aws dynamodb put-item --table-name Products --item {\"id\":{\"S\":\"7567ec4b-b10c-48c5-9345-fc73c48a80a2\"},\"title\":{\"S\":\"Fern\"},\"description\":{\"S\":\"A" "fern" "is" "a" "member" "of" "a" "group" "of" "vascular" "plants" "that" "reproduce" "via" "spores" "and" "have" "neither" "seeds" "nor" "flowers\"},\"price\":{\"N\":\"7\"}}
aws dynamodb put-item --table-name Products --item {\"id\":{\"S\":\"7567ec4b-b10c-48c5-9345-fc73c48a80a1\"},\"title\":{\"S\":\"Asparagus\"},\"description\":{\"S\":\"Asparagus" "is" "a" "genus" "of" "flowering" "plants" "in" "the" "family" "Asparagaceae" "subfamily" "Asparagoideae\"},\"price\":{\"N\":\"14\"}}
aws dynamodb put-item --table-name Products --item {\"id\":{\"S\":\"7567ec4b-b10c-48c5-9345-fc73c48a80a3\"},\"title\":{\"S\":\"Succulents\"},\"description\":{\"S\":\"In" "botany" "succulent" "plants" "also" "known" "as" "succulents" "are" "plants" "with" "parts" "that" "are" "thickened" "fleshy" "and" "engorged" "usually" "to" "retain" "water" "in" "arid" "climates" "or" "soil" "conditions\"},\"price\":{\"N\":\"5\"}}

aws dynamodb put-item --table-name Stocks --item {\"product_id\":{\"S\":\"7567ec4b-b10c-48c5-9345-fc73c48a80aa\"},\"count\":{\"N\":\"4\"}}
aws dynamodb put-item --table-name Stocks --item {\"product_id\":{\"S\":\"7567ec4b-b10c-48c5-9345-fc73c48a80a0\"},\"count\":{\"N\":\"11\"}}
aws dynamodb put-item --table-name Stocks --item {\"product_id\":{\"S\":\"7567ec4b-b10c-48c5-9345-fc73c48a80a2\"},\"count\":{\"N\":\"31\"}}
aws dynamodb put-item --table-name Stocks --item {\"product_id\":{\"S\":\"7567ec4b-b10c-48c5-9345-fc73c48a80a1\"},\"count\":{\"N\":\"13\"}}
aws dynamodb put-item --table-name Stocks --item {\"product_id\":{\"S\":\"7567ec4b-b10c-48c5-9345-fc73c48a80a3\"},\"count\":{\"N\":\"24\"}}
