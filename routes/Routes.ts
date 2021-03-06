import * as Home from '../controller/Home';
import * as ShortURL from '../controller/ShortURL';
import * as ContactForm from '../controller/ContactForm';
import * as YahooScrapper from '../controller/YahooScrapper';

export const InitRoutes = (app: any) => {
	app.get('/', Home.Init);

	app.post('/shortener', ShortURL.GenerateShortURL);
	app.get('/:shortUrl', ShortURL.GetShortURL);

	app.post('/send', ContactForm.Send);

	app.post('/Scrap/GetData_ByTicker', YahooScrapper.GetData_ByTicker);
	app.post('/Scrap/GetRecomendationsByTicker', YahooScrapper.GetRecomendationsByTicker);
	app.post('/Scrap/GetTrendingSymbols', YahooScrapper.GetTrendingSymbols);
	app.post('/Scrap/TickerAutoComplete', YahooScrapper.TickerAutoComplete);
}