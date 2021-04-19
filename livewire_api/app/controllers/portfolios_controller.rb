class PortfoliosController < ApplicationController
  def index
    @portfolio = Portfolio.all.where(user_id: params['user_id'])
    if current_user.id == @portfolio.user_id
      render json: @portfolios, only: %i[id portfolio_name user_id]
    else
      render json: 'invalid'
    end
  end

  def show
    @portfolios = Portfolio.find(params[:id])
    render json: @portfolios # , include: [:stocks]
  end

  def create
    @portfolio = Portfolio.create(portfolio_params)
    if current_user.id == user_id.id
      if @portfolio.save
        render json: @portfolio
      else
        render json: { error: 'Invalid' }
      end
    else
      render json: { error: 'Invalid User' }
    end
  end

  def destroy
    @portfolio = Portfolio.find(params[:id])
    if @portfolio.destroy
        render json: {pId: @portfolio.id}, status: 200
    end
  end

  private

  def portfolio_params
    params.require(:portfolio).permit(:portfolio_name, :user_id)
  end
end
