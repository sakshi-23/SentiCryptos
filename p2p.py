import json, math, random, requests

currency_list = ["BTC", "LTC", "XLM", "ADA", "XRP"]
prices_json = requests.get("https://min-api.cryptocompare.com/data/price?fsym=ETH&tsyms=BTC,LTC,XLM,ADA,XRP").json()

class Loan(object):

	def __init__(self):
		self.borrower = gen_name()
		self.eth = random.uniform(1,5)
		self.tokens = self.gen_tokens()
		self.period = random.choice(["", str(random.randint(1,10))+"m"]) + str(random.randint(10,30))+"d"
		self.interest = 0.05*self.eth

	def gen_tokens(self):
		currency = random.choice(currency_list)
		return {"currency":currency, "symbol": prices_json[currency]*1.1*self.eth}

	def get_borrow_json(self):
		return {"borrower":self.borrower,"eth":self.eth, "tokens":self.tokens, "period":self.period, "interest":self.interest }

	def __str__(self):
		return self.borrower + ";" + str(self.eth) + ";" + self.tokens + ";" + str(self.period) + ";" + str(self.interest)

def gen_name():
		return "0x" + ''.join([random.choice('0123456789abcdef') for i in range(40)])

def create_n_records(n):
	return {"data":[Loan().get_borrow_json() for i in range(n)]}

def get_min_tokens(eth, currency):
	rate = prices_json[currency]
	tokens = rate*eth
	return {"tokens":tokens, "rate":rate,"eth":tokens/rate}


