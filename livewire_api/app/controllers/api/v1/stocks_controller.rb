class Api::V1::StocksController < ApplicationController
    before_action :authenticate_user

    def index
        #@stocks = Stock.where(portfolio_id: params[:portfolio_id])
        @stocks = Stock.all
        render json: @stocks, only: %i[id stock_name quantity portfolio_id user_id], status: 201
    end
    
    def show
        @stocks = Stock.find(params[:id])
        render json: @stocks
    end
    
    def create
        portfolio = Portfolio.find(params[:portfolio_id])
        stock = portfolio.stocks.build(stock_params)
        if stock.save
          render json: stock, status: 201
        end       
=begin
        @stock = Stock.create(stock_params)
        render json: @stock, status: 201
=end
    end
    
    def destroy
        portfolio = Portfolio.find(params[:portfolio_id])
        stock = portfolio.stocks.find(params[:id])
        if stock.destroy
            render json: {stockId: stock.id}, status: 200
        end
=begin
        @stock = Stock.find(params[:id])
        if (@stock.destroy)
            render json: { message: "#{@stock.stock} is deleted." }, status: 200
        end
=end
    end
    
    def update
        
        portfolio = Portfolio.find(params[:portfolio_id])
        stock = portfolio.stocks.find(params[:id])

        if stock.update(stock_params)
            render json: stock, status: 200
        end
    end

    
    private
    
    def stock_params
        params.require(:stock).permit(:stock_name, :quantity, :portfolio_id, :user_id)
    end
end