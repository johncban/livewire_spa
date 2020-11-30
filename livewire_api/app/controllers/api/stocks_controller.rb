module Api
    class StocksController < Api::ApplicationController
      before_action :authenticate_user
      #before_action :set_user, only: [:show, :update, :destroy]
  
      def index
      end

      def show 
      end

      def create
      end

      def update 
      end

      def destroy
      end

      private
        
        def stock_params
        end

    end
end