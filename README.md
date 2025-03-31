### Starting Postgresql in docker

docker run --name home-bakery-db -e POSTGRES_PASSWORD=passwd -e POSTGRES_USER=user -e POSTGRES_DB=home-bakery -p 5432:5432 -d postgres

### Barcode look up

https://www.barcodelookup.com/
https://go-upc.com/
https://www.ean-search.org/
