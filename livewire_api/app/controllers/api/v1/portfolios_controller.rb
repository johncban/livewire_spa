class Api::V1::PortfoliosController < ApplicationController
    before_action :authenticate_user
    
    #skip_before_action :authorized, only: [:index]
  
   def index
      @portfolios = Portfolio.all.where(:user_id => params["user_id"])
      render json: @portfolios, only: [:id, :portfolio_name, :user_id], status: 201  
   end

   def show
       @portfolios = Portfolio.find(params[:id])
       render json: @portfolios#, include: [:stocks]
   end

   def create
        @portfolio = Portfolio.create(portfolio_params)
        render json: @portfolio, status: 201
   end

   def destroy
       @portfolio = Portfolio.find(params[:id])
       @portfolio.destroy
       render json: {message: "#{portfolio.portfolio_name} Portfolio and Stocks are Deleted."}
   end



   private 

       def portfolio_params
           params.require(:portfolio).permit(:portfolio_name, :user_id)
       end
end
  