package edu.oregonstate.cs361.battleship;

import java.util.ArrayList;
import java.util.List;

/**
 * Created by michaelhilton on 1/26/17.
 */

public class BattleshipModel {


    //                  Member variables
    private Ship playerAircraftCarrier;
    private Ship playerBattleship;
    private Ship playerCruiser;
    private Ship playerDestroyer;
    private Ship playerSubmarine;

    private Ship computerAircraftCarrier;
    private Ship computerBattleship;
    private Ship computerCruiser;
    private Ship computerDestroyer;
    private Ship computerSubmarine;

    private List<Point> playerHits;
    private List<Point> playerMisses;
    private List<Point> computerHits;
    private List<Point> computerMisses;

    private boolean gameOngoing;


    public List<Point> getPlayerHits() {
        return playerHits;
    }

    public List<Point> getPlayerMisses() {
        return playerMisses;
    }

    public List<Point> getComputerHits() {
        return computerHits;
    }

    public List<Point> getComputerMisses() {
        return computerMisses;
    }

    //                  Constructor
    public BattleshipModel () {

        playerAircraftCarrier = new Ship("playerAircraftCarrier");
        playerBattleship = new Ship("playerBattleship");
        playerCruiser = new Ship("playerCruiser");
        playerDestroyer = new Ship("playerDestroyer");
        playerSubmarine = new Ship("playerSubmarine");

        computerAircraftCarrier = new Ship("computerAircraftCarrier");
        computerBattleship = new Ship("computerBattleship");
        computerCruiser = new Ship("computerCruiser");
        computerDestroyer = new Ship("computerDestroyer");
        computerSubmarine = new Ship("computerSubmarine");

        playerHits = new ArrayList<>();
        playerMisses = new ArrayList<>();
        computerHits = new ArrayList<>();
        computerMisses = new ArrayList<>();

        gameOngoing = true;
    }


    //          Add Point object to an array function
    public boolean addPointtoArray(Point somePoint, List someArray) {

        if (somePoint.getAcross() > 10 || somePoint.getAcross() < 1 || somePoint.getDown() > 10 || somePoint.getDown() < 1)

            return false;

        else {

            someArray.add(somePoint);
            return true;

        }
    }

    //          Get ship by ID function, assumes user only selects from drop down menu on front end
    public Ship getShipByID(String id) {

        if(id.toLowerCase().contains("computer")) {

            if (id.toLowerCase().contains("aircraftcarrier")) {
                return getComputerAircraftCarrier();
            }

            else if (id.toLowerCase().contains("battleship")) {
                return getComputerBattleship();
            }

            else if (id.toLowerCase().contains("submarine") ) {
                return getComputerSubmarine();
            }

            else if (id.toLowerCase().contains("cruiser")) {
                return getComputerCruiser();
            }

            else if (id.toLowerCase().contains("destroyer")) {
                return getComputerDestroyer();
            }
        }

        else {

            if (id.toLowerCase().contains("aircraftcarrier")) {
                return getPlayerAircraftCarrier();
            }

            else if (id.toLowerCase().contains("battleship")) {
                return getPlayerBattleship();
            }

            else if (id.toLowerCase().contains("submarine") ) {
                return getPlayerSubmarine();
            }

            else if (id.toLowerCase().contains("cruiser")) {
                return getPlayerCruiser();
            }

            else if (id.toLowerCase().contains("destroyer")) {
                return getPlayerDestroyer();
            }
        }

        // DEFAULTS TO THIS IF ID FORMAT IS INCORRECT:
        Ship PizzaShip = new Ship("PizzaShip");
        PizzaShip.setName("PizzaShip");
        return PizzaShip;
    }

    /////////////////////////////////////////////////////////////////////////
    //DOES THIS STAY?

    //          Getters and Setters
    public Ship getPlayerAircraftCarrier() {
        return playerAircraftCarrier;
    }

    //public void setPlayerAircraftCarrier(Ship playerAircraftCarrier) { this.playerAircraftCarrier = playerAircraftCarrier; }

    public Ship getPlayerBattleship() {
        return playerBattleship;
    }

    //public void setPlayerBattleship(Ship playerBattleship) { this.playerBattleship = playerBattleship; }

    public Ship getPlayerCruiser() {
        return playerCruiser;
    }

    //public void setPlayerCruiser(Ship playerCruiser) { this.playerCruiser = playerCruiser; }

    public Ship getPlayerDestroyer() {
        return playerDestroyer;
    }

    //public void setPlayerDestroyer(Ship playerDestroyer) { this.playerDestroyer = playerDestroyer; }

    public Ship getPlayerSubmarine() {
        return playerSubmarine;
    }

    //public void setPlayerSubmarine(Ship playerSubmarine) { this.playerSubmarine = playerSubmarine; }

    public Ship getComputerAircraftCarrier() {
        return computerAircraftCarrier;
    }

    //public void setComputerAircraftCarrier(Ship computerAircraftCarrier) { this.computerAircraftCarrier = computerAircraftCarrier; }

    public Ship getComputerBattleship() {
        return computerBattleship;
    }

    //public void setComputerBattleship(Ship computerBattleship) { this.computerBattleship = computerBattleship; }

    public Ship getComputerCruiser() {
        return computerCruiser;
    }

    //public void setComputerCruiser(Ship computerCruiser) { this.computerCruiser = computerCruiser; }

    public Ship getComputerDestroyer() {
        return computerDestroyer;
    }

    //public void setComputerDestroyer(Ship computerDestroyer) { this.computerDestroyer = computerDestroyer; }

    public Ship getComputerSubmarine() {
        return computerSubmarine;
    }

    //public void setComputerSubmarine(Ship computerSubmarine) { this.computerSubmarine = computerSubmarine; }

    public boolean isGameOngoing() {
        return gameOngoing;
    }

    public void setGameOngoing(boolean gameOngoing) {
        this.gameOngoing = gameOngoing;
    }

}
